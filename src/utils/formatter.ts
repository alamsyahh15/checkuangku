/**
 * Format a number into Indonesian Rupiah currency format.
 * Example: 5299884318 -> "Rp5.299.884.318"
 * Negative: -5299884318 -> "Rp-5.299.884.318"
 */
export function formatRupiah(value: number, includePrefix: boolean = true): string {
  if (isNaN(value)) value = 0;
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(absValue);

  if (!includePrefix) return formatted;
  
  return isNegative ? `Rp-${formatted}` : `Rp${formatted}`;
}

/**
 * Format string with thousand separators for form inputs.
 * Example: "1000000" -> "1.000.000"
 */
export function formatInputNumber(valueStr: string | number): string {
  if (valueStr === '' || valueStr === null || valueStr === undefined) return '';
  const num = typeof valueStr === 'number' ? valueStr : parseRupiah(valueStr);
  if (num === 0) return '';
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Parse input string into a raw numeric value.
 * Example: "1.000.000" -> 1000000
 */
export function parseRupiah(str: string | number): number {
  if (typeof str === 'number') return isNaN(str) ? 0 : str;
  if (!str) return 0;
  
  // Remove non-numeric characters except minus sign
  const sanitized = str.replace(/[^0-9-]/g, '');
  const parsed = parseInt(sanitized, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format decimal multiplier (e.g. 0.06 -> "0.06X" or "3.5X")
 */
export function formatRatioTimes(ratio: number): string {
  if (isNaN(ratio) || !isFinite(ratio)) return '0X';
  return `${ratio.toFixed(2)}X`;
}

/**
 * Format ratio percentage (e.g. 0.0732 -> "7.32%")
 */
export function formatRatioPercentage(ratioPercent: number): string {
  if (isNaN(ratioPercent) || !isFinite(ratioPercent)) return '0%';
  // If whole number show 1 decimal or 2
  return `${ratioPercent.toFixed(2)}%`;
}
