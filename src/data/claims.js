const payers = [
  { name: 'Georgia Medicaid', short: 'Medicaid', baseDenialRate: 0.2 },
  { name: 'TRICARE East', short: 'TRICARE', baseDenialRate: 0.16 },
  { name: 'BCBS of Georgia', short: 'BCBS', baseDenialRate: 0.11 },
  { name: 'Aetna', short: 'Aetna', baseDenialRate: 0.09 },
  { name: 'UnitedHealthcare', short: 'UHC', baseDenialRate: 0.1 },
];

const providers = [
  { id: 'PRV-001', name: 'Dr. Maya Patel', specialty: 'Psychiatry', medicaid: 'Active', tricare: 'Pending', bcbs: 'Active', aetna: 'Active', uhc: 'Active' },
  { id: 'PRV-002', name: 'Dr. Owen Brooks', specialty: 'Psychiatry', medicaid: 'Active', tricare: 'Active', bcbs: 'Active', aetna: 'Active', uhc: 'Active' },
  { id: 'PRV-003', name: 'Dana Kim, LPC', specialty: 'Therapy', medicaid: 'Pending', tricare: 'Active', bcbs: 'Active', aetna: 'Active', uhc: 'Active' },
  { id: 'PRV-004', name: 'Rachel Green, LCSW', specialty: 'Therapy', medicaid: 'Active', tricare: 'Active', bcbs: 'Active', aetna: 'Pending', uhc: 'Active' },
  { id: 'PRV-005', name: 'Eli Turner, BCBA', specialty: 'ABA', medicaid: 'Active', tricare: 'Pending', bcbs: 'Not Contracted', aetna: 'Active', uhc: 'Active' },
  { id: 'PRV-006', name: 'Noah Bennett, BCBA', specialty: 'ABA', medicaid: 'Pending', tricare: 'Pending', bcbs: 'Not Contracted', aetna: 'Active', uhc: 'Pending' },
  { id: 'PRV-007', name: 'Priya Shah, PsyD', specialty: 'Psychology', medicaid: 'Active', tricare: 'Active', bcbs: 'Active', aetna: 'Active', uhc: 'Active' },
  { id: 'PRV-008', name: 'Lena Morris, LMFT', specialty: 'Therapy', medicaid: 'Pending', tricare: 'Active', bcbs: 'Active', aetna: 'Active', uhc: 'Pending' },
];

const denialCatalog = [
  {
    cluster: 'Credentialing gap',
    carc: 'PR-170',
    status: 'Denied',
    stage: 'Front End',
    rootCause: 'Rendering provider not fully enrolled or linked to payer contract.',
    severity: 'Critical',
    recoverability: 'Medium',
    weight: 0.34,
  },
  {
    cluster: 'Authorization mismatch',
    carc: 'CO-197',
    status: 'Denied',
    stage: 'Authorization',
    rootCause: 'Auth missing, expired, or unit count exhausted before DOS.',
    severity: 'High',
    recoverability: 'High',
    weight: 0.18,
  },
  {
    cluster: 'Timely filing',
    carc: 'CO-29',
    status: 'Denied',
    stage: 'Billing',
    rootCause: 'Claim submitted after payer timely filing limit.',
    severity: 'High',
    recoverability: 'Low',
    weight: 0.08,
  },
  {
    cluster: 'Eligibility lapse',
    carc: 'CO-16',
    status: 'Denied',
    stage: 'Front End',
    rootCause: 'Coverage inactive or subscriber detail mismatch on date of service.',
    severity: 'Medium',
    recoverability: 'Medium',
    weight: 0.12,
  },
  {
    cluster: 'Coding / modifier issue',
    carc: 'CO-4',
    status: 'Denied',
    stage: 'Clinical / Coding',
    rootCause: 'Modifier or diagnosis pairing does not support billed service.',
    severity: 'Medium',
    recoverability: 'High',
    weight: 0.08,
  },
  {
    cluster: 'Duplicate / overlap',
    carc: 'CO-18',
    status: 'Denied',
    stage: 'Billing',
    rootCause: 'Duplicate claim or overlapping service line already processed.',
    severity: 'Low',
    recoverability: 'High',
    weight: 0.06,
  },
  {
    cluster: 'Documentation gap',
    carc: 'CO-15',
    status: 'Denied',
    stage: 'Clinical / Coding',
    rootCause: 'Clinical note, signature, or service support missing at audit review.',
    severity: 'Medium',
    recoverability: 'Medium',
    weight: 0.07,
  },
  {
    cluster: 'In process / pended',
    carc: 'N/A',
    status: 'Pending',
    stage: 'A/R Follow-up',
    rootCause: 'Claim not yet adjudicated or awaiting payer response.',
    severity: 'Info',
    recoverability: 'N/A',
    weight: 0.07,
  },
];

const patientPrefixes = ['Ava', 'Liam', 'Emma', 'Noah', 'Mia', 'Ethan', 'Zoe', 'Lucas', 'Ruby', 'Ezra', 'Nora', 'Levi'];
const patientSuffixes = ['Carter', 'Brooks', 'Nguyen', 'Patel', 'James', 'Rivera', 'Perry', 'Scott', 'Allen', 'Lewis'];

function seeded(index) {
  const x = Math.sin(index * 999 + 17) * 10000;
  return x - Math.floor(x);
}

function chooseWeighted(index, items, key = 'weight') {
  const roll = seeded(index);
  let cursor = 0;
  for (const item of items) {
    cursor += item[key];
    if (roll <= cursor) return item;
  }
  return items[items.length - 1];
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

const claims = Array.from({ length: 300 }, (_, idx) => {
  const claimNumber = idx + 1;
  const payer = payers[idx % payers.length];
  const provider = providers[idx % providers.length];
  const serviceDate = new Date(2025, 11, 1 + (idx % 90));
  const denial = chooseWeighted(idx + (payer.short.length * 3), denialCatalog);
  const isCredentialingRisk =
    denial.cluster === 'Credentialing gap' &&
    (provider[payer.short.toLowerCase()] === 'Pending' || provider[payer.short.toLowerCase()] === 'Not Contracted');

  const amountBase = 140 + Math.round(seeded(idx + 42) * 900);
  const billedAmount = amountBase + (provider.specialty === 'ABA' ? 250 : provider.specialty === 'Psychiatry' ? 160 : 80);
  const riskAmount = denial.status === 'Pending' ? Math.round(billedAmount * 0.5) : billedAmount;

  let claimStatus = denial.status;
  let cluster = denial.cluster;
  let carc = denial.carc;
  let stage = denial.stage;
  let rootCause = denial.rootCause;
  let recoverability = denial.recoverability;
  let severity = denial.severity;

  if (!isCredentialingRisk && cluster === 'Credentialing gap' && seeded(idx + 100) > 0.55) {
    cluster = 'Authorization mismatch';
    carc = 'CO-197';
    stage = 'Authorization';
    rootCause = 'Auth expired or service exceeded approved units.';
    recoverability = 'High';
    severity = 'High';
  }

  const patientName = `${patientPrefixes[idx % patientPrefixes.length]} ${patientSuffixes[idx % patientSuffixes.length]}`;
  const submittedLag = 2 + Math.floor(seeded(idx + 200) * 25);
  const denialRateHint = payer.baseDenialRate + (cluster === 'Credentialing gap' ? 0.08 : 0);

  return {
    id: `CLM-${String(claimNumber).padStart(4, '0')}`,
    patientName,
    payer: payer.name,
    payerShort: payer.short,
    provider: provider.name,
    providerId: provider.id,
    specialty: provider.specialty,
    serviceDate: serviceDate.toISOString().slice(0, 10),
    submittedDate: new Date(serviceDate.getTime() + submittedLag * 86400000).toISOString().slice(0, 10),
    billedAmount,
    allowedAmount: Math.round(billedAmount * (0.72 + seeded(idx + 400) * 0.18)),
    riskAmount,
    status: claimStatus,
    denialCluster: cluster,
    carc,
    rcmStage: stage,
    rootCause,
    recoverability,
    severity,
    credentialingStatus: provider[payer.short.toLowerCase()],
    denialRateHint,
  };
});

export { claims, providers, payers, formatCurrency };
