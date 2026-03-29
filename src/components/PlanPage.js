import React from 'react';

export default function PlanPage() {
  const plan = [
    {
      timing: 'Days 1–15',
      title: 'Freeze scheduling against unsupported payer/provider combinations',
      detail: 'Add a front-end rule so providers with pending or non-contracted status cannot be booked for affected payers until enrollment is active.',
    },
    {
      timing: 'Days 1–30',
      title: 'Build a live credentialing roster owned jointly by ops and contracting',
      detail: 'One source of truth with payer, provider, effective date, pending date, missing packet items, and escalation owner.',
    },
    {
      timing: 'Days 15–30',
      title: 'Launch a denial workqueue specifically for PR-170-style claims',
      detail: 'Separate credentialing denials from generic billing follow-up so appeals, retro enrollments, and re-bills are worked deliberately.',
    },
    {
      timing: 'Days 31–60',
      title: 'Tie authorization workflow to credentialing status',
      detail: 'Do not allow auths to be requested or sessions to be confirmed without verifying that the rendering provider is billable for that payer.',
    },
    {
      timing: 'Days 31–60',
      title: 'Create payer-specific Georgia playbooks',
      detail: 'Document Medicaid and TRICARE enrollment quirks, revalidation timelines, and escalation contacts to reduce preventable variance.',
    },
    {
      timing: 'Days 61–90',
      title: 'Stand up an exec dashboard with leading indicators',
      detail: 'Track pending credentialing count, unsupported scheduled visits, credentialing-linked denial rate, and recovered dollars by cluster.',
    },
  ];

  return (
    <div className="page-grid">
      <div className="card">
        <h2>90-day turnaround plan</h2>
        <p>
          Priority order is intentional: stop new leakage first, create an operating system second, then scale measurement.
        </p>
      </div>
      <div className="plan-list">
        {plan.map(item => (
          <div className="plan-item" key={item.title}>
            <div className="plan-head">
              <div className="plan-title">{item.title}</div>
              <span className="tag pending">{item.timing}</span>
            </div>
            <div className="small" style={{ marginTop: 10 }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
