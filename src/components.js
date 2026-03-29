import React, { useMemo, useState } from 'react';
import { money, uniqueValues } from './utils';

export default function ClaimsLogPage({ claims }) {
  const [payer, setPayer] = useState('All');
  const [carc, setCarc] = useState('All');
  const [status, setStatus] = useState('All');

  const payerOptions = ['All', ...uniqueValues(claims, 'payer')];
  const carcOptions = ['All', ...uniqueValues(claims, 'carc')];
  const statusOptions = ['All', ...uniqueValues(claims, 'status')];

  const filtered = useMemo(() => {
    return claims.filter(item => {
      return (payer === 'All' || item.payer === payer)
        && (carc === 'All' || item.carc === carc)
        && (status === 'All' || item.status === status);
    });
  }, [claims, payer, carc, status]);

  return (
    <div className="page-grid">
      <div className="card">
        <div className="filters">
          <select value={payer} onChange={e => setPayer(e.target.value)}>
            {payerOptions.map(option => <option key={option}>{option}</option>)}
          </select>
          <select value={carc} onChange={e => setCarc(e.target.value)}>
            {carcOptions.map(option => <option key={option}>{option}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            {statusOptions.map(option => <option key={option}>{option}</option>)}
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Patient</th>
                <th>Payer</th>
                <th>Provider</th>
                <th>CARC</th>
                <th>Status</th>
                <th>Cluster</th>
                <th>RCM Stage</th>
                <th>Billed</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.patientName}</td>
                  <td>{item.payer}</td>
                  <td>{item.provider}</td>
                  <td>{item.carc}</td>
                  <td>{item.status}</td>
                  <td>{item.denialCluster}</td>
                  <td>{item.rcmStage}</td>
                  <td>{money(item.billedAmount)}</td>
                  <td>{money(item.riskAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer-note">Showing {filtered.length} of {claims.length} claims.</div>
      </div>
    </div>
  );
}
