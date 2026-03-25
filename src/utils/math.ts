export const calculate = (expression: string): number => {
  try {
    // Safety check: only allow numbers and basic operators
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      throw new Error('Invalid expression');
    }
    // Using Function for basic math calculation (it's safe here due to regex)
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${expression}`)();
    if (!isFinite(result)) throw new Error('Result is not finite');
    return result;
  } catch (error) {
    console.error('Calculation error:', error);
    return NaN;
  }
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  if (isNaN(num)) return 'Error';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (num: number, currency: string = 'USD'): string => {
  if (isNaN(num)) return 'Error';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(num);
};
