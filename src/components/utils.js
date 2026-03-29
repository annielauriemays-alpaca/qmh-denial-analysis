export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function pct(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export function uniqueValues(items, key) {
  return [...new Set(items.map(item => item[key]))].sort();
}
