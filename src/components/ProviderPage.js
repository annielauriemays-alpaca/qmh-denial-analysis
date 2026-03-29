import React from 'react';
import { money, pct } from './utils';

function tagClass(value) {
  return String(value).toLowerCase().replace(/\s+/g, '');
}

export default function ProviderPage({ providers, credentialMatrix }) {
  return (
    <div className="page-grid">
      <div className="card">
        <h3>Provider denial profiles</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Specialty</th>
                <th>Claims</th>
                <th>Denied</th>
                <th>Denial Rate</th>
                <th>At-Risk $</th>
                <th>Top Driver</th>
              </tr>
            </thead>
            <tbody>
              {providers.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.specialty}</td>
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
        <h3>Credentialing status matrix</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Medicaid</th>
                <th>TRICARE</th>
                <th>BCBS</th>
                <th>Aetna</th>
                <th>UHC</th>
              </tr>
            </thead>
            <tbody>
              {credentialMatrix.map(item => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  {['medicaid', 'tricare', 'bcbs', 'aetna', 'uhc'].map(key => (
                    <td key={key}><span className={`tag ${tagClass(item[key])}`}>{item[key]}</span></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
