import React from 'react';
import { money, pct } from './utils';

export default function OverviewPage({ metrics, stageFlow, clusterBars }) {
  return (
    <div className="page-grid">
      <div className="card">
        <h2>Core finding</h2>
        <p>
          The denial story is not random. It is concentrated around provider credentialing misalignment,
          especially for Georgia Medicaid and TRICARE on therapy and ABA claims. In plain English: the
          practice is doing work it cannot always cleanly bill because payer enrollment status is not keeping
          pace with scheduling and authorization operations.
        </p>
      </div>

      <div className="stats-grid">
        <div className="metric">
          <div className="metric-label">Claims analyzed</div>
          <div className="metric-value">{metrics.totalClaims}</div>
          <div className="metric-note">Synthetic 90-day sample for QMH Behavioral Partners</div>
        </div>
        <div className="metric">
          <div className="metric-label">Denied claims</div>
          <div className="metric-value">{metrics.deniedClaims}</div>
          <div className="metric-note">Overall denial rate {pct(metrics.denialRate)}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Revenue at risk</div>
          <div className="metric-value">{money(metrics.revenueAtRisk)}</div>
          <div className="metric-note">Open denials + pended claims exposure</div>
        </div>
        <div className="metric">
          <div className="metric-label">Credentialing-linked risk</div>
          <div className="metric-value">{money(metrics.credentialingRisk)}</div>
          <div className="metric-note">{pct(metrics.credentialingRisk / metrics.revenueAtRisk)} of total at-risk dollars</div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <h3>Revenue-at-risk by RCM stage</h3>
          <div className="flow">
            {stageFlow.map((stage, index) => (
              <React.Fragment key={stage.name}>
                <div className="flow-box">
                  <div className="metric-label">{stage.name}</div>
                  <div className="metric-value" style={{ fontSize: 26 }}>{money(stage.amount)}</div>
                  <div className="small">{stage.claims} claims impacted</div>
                </div>
                {index < stageFlow.length - 1 && <div className="flow-arrow">→</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="footer-note">
            Biggest concentration sits upstream. Front-end and authorization breakdowns are cascading into
            avoidable billing and A/R work.
          </div>
        </div>

        <div className="card">
          <h3>Category bar chart</h3>
          <div className="bar-list">
            {clusterBars.map(item => (
              <div className="bar-row" key={item.name}>
                <div>{item.name}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${item.share * 100}%` }} />
                </div>
                <div>{money(item.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
