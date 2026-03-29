import React from 'react';
import { money } from './utils';

function tagClass(value) {
  return String(value).toLowerCase().replace(/\s+/g, '');
}

export default function DenialPatternsPage({ clusters }) {
  return (
    <div className="page-grid">
      {clusters.map(cluster => (
        <div className="card" key={cluster.name}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
            <div>
              <h3>{cluster.name}</h3>
              <p>{cluster.rootCause}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span className={`tag ${tagClass(cluster.severity)}`}>{cluster.severity}</span>
              <span className={`tag ${tagClass(cluster.recoverability === 'High' ? 'highrec' : cluster.recoverability === 'Medium' ? 'mediumrec' : cluster.recoverability === 'Low' ? 'lowrec' : 'info')}`}>
                Recoverability: {cluster.recoverability}
              </span>
            </div>
          </div>
          <div className="three-col">
            <div className="metric">
              <div className="metric-label">Claim count</div>
              <div className="metric-value">{cluster.claims}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Dollar impact</div>
              <div className="metric-value">{money(cluster.amount)}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Typical CARC</div>
              <div className="metric-value">{cluster.carc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
