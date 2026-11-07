const SAFE_PATTERN = /^[0-9+\-*/.() ]+$/;

export const sanitizeExpression = (value: string): string => value?.replace(/[^0-9+\-*/.() ]/g, '') ?? '';

export const evaluateExpression = (value: string): number | null => {
  const expr = sanitizeExpression(value)?.trim() ?? '';
  if (!expr || !SAFE_PATTERN.test(expr)) {
    return null;
  }
  const computed = Function(`"use strict"; return (${expr})`)();
  const amount = typeof computed === 'number' ? computed : Number(computed);
  if (!Number.isFinite(amount)) {
    return null;
  }
  return Math.round(amount * 100) / 100;
};
