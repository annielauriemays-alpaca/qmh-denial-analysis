import React, { useMemo, useState } from 'react';
import { claims, providers as credentialMatrix } from './data/claims';
import OverviewPage from './components/OverviewPage';
import DenialPatternsPage from './components/DenialPatternsPage';
import PayerPage from './components/PayerPage';
import ProviderPage from './components/ProviderPage';
import ClaimsLogPage from './components/ClaimsLogPage';
import PlanPage from './components/PlanPage';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'patterns', label: 'Denial Patterns' },
  { id: 'payer', label: 'By Payer' },
  { id: 'provider', label: 'By Provider' },
  { id: 'claims', label: 'Claims Log' },
  { id: 'plan', label: '90-Day Plan' },
];

function summarizeClaims(data) {
  const deniedClaims = data.filter(item => item.status === 'Denied');
  const revenueAtRisk = data
    .filter(item => item.status === 'Denied' || item.status === 'Pending')
    .reduce((sum, item) => sum + item.riskAmount, 0);
  const credentialingRisk = data
    .filter(item => item.denialCluster === 'Credentialing gap')
    .reduce((sum, item) => sum + item.riskAmount, 0);

  const byStage = ['Front End', 'Authorization', 'Clinical / Coding', 'Billing', 'A/R Follow-up'].map(name => {
    const rows = data.filter(item => item.rcmStage === name);
    return {
      name,
      claims: rows.length,
      amount: rows.reduce((sum, item) => sum + item.riskAmount, 0),
    };
  });

  const byClusterMap = data.reduce((acc, item) => {
    if (!acc[item.denialCluster]) {
      acc[item.denialCluster] = {
        name: item.denialCluster,
        claims: 0,
        amount: 0,
        rootCause: item.rootCause,
        severity: item.severity,
        recoverability: item.recoverability,
        carc: item.carc,
      };
    }
    acc[item.denialCluster].claims += 1;
    acc[item.denialCluster].amount += item.riskAmount;
    return acc;
  }, {});

  const clusters = Object.values(byClusterMap).sort((a, b) => b.amount - a.amount);
  const totalClusterAmount = clusters.reduce((sum, item) => sum + item.amount, 0);
  const clusterBars = clusters.slice(0, 6).map(item => ({
    ...item,
    share: totalClusterAmount ? item.amount / totalClusterAmount : 0,
  }));

  const payerSummary = Object.values(data.reduce((acc, item) => {
    if (!acc[item.payer]) {
      acc[item.payer] = { name: item.payer, claims: 0, denied: 0, amount: 0, clusters: {} };
    }
    acc[item.payer].claims += 1;
    if (item.status === 'Denied') acc[item.payer].denied += 1;
    if (item.status === 'Denied' || item.status === 'Pending') acc[item.payer].amount += item.riskAmount;
    acc[item.payer].clusters[item.denialCluster] = (acc[item.payer].clusters[item.denialCluster] || 0) + 1;
    return acc;
  }, {})).map(item => ({
    ...item,
    denialRate: item.denied / item.claims,
    topDriver: Object.entries(item.clusters).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
  })).sort((a, b) => b.denialRate - a.denialRate);

  const providerSummary = Object.values(data.reduce((acc, item) => {
    if (!acc[item.provider]) {
      acc[item.provider] = { name: item.provider, specialty: item.specialty, claims: 0, denied: 0, amount: 0, clusters: {} };
    }
    acc[item.provider].claims += 1;
    if (item.status === 'Denied') acc[item.provider].denied += 1;
    if (item.status === 'Denied' || item.status === 'Pending') acc[item.provider].amount += item.riskAmount;
    acc[item.provider].clusters[item.denialCluster] = (acc[item.provider].clusters[item.denialCluster] || 0) + 1;
    return acc;
  }, {})).map(item => ({
    ...item,
    denialRate: item.denied / item.claims,
    topDriver: Object.entries(item.clusters).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A',
  })).sort((a, b) => b.denialRate - a.denialRate);

  return {
    metrics: {
      totalClaims: data.length,
      deniedClaims: deniedClaims.length,
      denialRate: deniedClaims.length / data.length,
      revenueAtRisk,
      credentialingRisk,
    },
    byStage,
    clusters,
    clusterBars,
    payerSummary,
    providerSummary,
  };
}

export default function App() {
  const [page, setPage] = useState('overview');

  const summary = useMemo(() => summarizeClaims(claims), []);

  const renderPage = () => {
    switch (page) {
      case 'overview':
        return <OverviewPage metrics={summary.metrics} stageFlow={summary.byStage} clusterBars={summary.clusterBars} />;
      case 'patterns':
        return <DenialPatternsPage clusters={summary.clusters} />;
      case 'payer':
        return <PayerPage payers={summary.payerSummary} />;
      case 'provider':
        return <ProviderPage providers={summary.providerSummary} credentialMatrix={credentialMatrix} />;
      case 'claims':
        return <ClaimsLogPage claims={claims} />;
      case 'plan':
        return <PlanPage />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <div className="topbar">
        <div>
          <div className="brand-title">QMH Behavioral Partners</div>
          <div className="brand-subtitle">
            Denial Analysis Suite • Multi-specialty behavioral health group in Georgia (Psych, Therapy, ABA)
          </div>
        </div>
        <div className="nav-row">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${page === item.id ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <main className="content">{renderPage()}</main>
    </div>
  );
}
