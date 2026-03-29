import React, { useMemo, useState } from 'react';
import { money, pct } from './utils';

export default function PayerPage({ payers }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return payers.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [payers, query]);

  const maxRate = Math.max(...filtered.map(p => p.denialRate), 0.01);

  return (
    <div className="page-grid">
      <div className="card">
        <div className="filters">
          <input
            placeholder="Search payer"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Payer</th>
                <th>Claims</th>
                <th>Denied</th>
                <th>Denial Rate</th>
                <th>At-Risk $</th>
                <th>Top Driver</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.claims}</td>
                  <td>{item.denied}</td>
                  <td>{pct(item.denialRate)}</td>
                  <td>{money(item.amount)}</td>
                  <td>{item.topDriver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>Searchable denial-rate bars</h3>
        <div className="bar-list">
          {filtered.map(item => (
            <div className="bar-row" key={item.name}>
              <div>{item.name}</div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(item.denialRate / maxRate) * 100}%` }} />
              </div>
              <div>{pct(item.denialRate)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
