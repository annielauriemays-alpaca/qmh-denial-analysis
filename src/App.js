import React, { useState } from 'react';
import Overview from './Overview';
import DenialPatterns from './DenialPatterns';
import ByPayer from './ByPayer';
import ByProvider from './ByProvider';
import ClaimsLog from './ClaimsLog';
import Plan90 from './Plan90';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'patterns', label: 'Denial Patterns' },
  { id: 'payer', label: 'By Payer' },
  { id: 'provider', label: 'By Provider' },
  { id: 'claims', label: 'Claims Log' },
  { id: 'plan', label: '90-Day Plan' },
];

export default function App() {
  const [page, setPage] = useState('overview');

  const renderPage = () => {
    switch (page) {
      case 'overview':
        return <Overview />;
      case 'patterns':
        return <DenialPatterns />;
      case 'payer':
        return <ByPayer />;
      case 'provider':
        return <ByProvider />;
      case 'claims':
        return <ClaimsLog />;
      case 'plan':
        return <Plan90 />;
      default:
        return <Overview />;
    }
  };

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text-primary)',
        minHeight: '100vh',
        background: '#fafaf8',
      }}
    >
      <div
        style={{
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          padding: '0 24px',
          background: 'var(--color-background-primary)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            height: 52,
            overflowX: 'auto',
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              marginRight: 20,
              color: 'var(--color-text-primary)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
          >
            QMH Behavioral Partners
          </div>

          {NAV_ITEMS.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 14px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: page === n.id ? 500 : 400,
                color:
                  page === n.id
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                borderBottom:
                  page === n.id
                    ? '2px solid var(--color-text-primary)'
                    : '2px solid transparent',
                borderRadius: 0,
                height: 52,
                whiteSpace: 'nowrap',
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 24px' }}>
        {renderPage()}
      </div>
    </div>
  );
}
