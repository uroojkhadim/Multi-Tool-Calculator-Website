export const calculate = (expression) => {
  try {
    // Safety check: only allow numbers and basic operators
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      return NaN;
    }
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${expression}`)();
    if (!isFinite(result)) return NaN;
    return result;
  } catch (error) {
    return NaN;
  }
};

export const formatNumber = (num, decimals = 2) => {
  if (isNaN(num)) return 'Error';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (num, currency = 'USD') => {
  if (isNaN(num)) return 'Error';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(num);
};
