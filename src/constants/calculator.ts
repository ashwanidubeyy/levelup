export const CALCULATOR_RULES = {
  MAX_LENGTH: 32,
} as const;

export const CALCULATOR_CONSTANTS = {
  TITLE: 'calculator.title',
  HINT: 'calculator.hint',
  DISPLAY_PLACEHOLDER: 'calculator.displayPlaceholder',
  USE: 'calculator.use',
  CLEAR: 'calculator.clear',
  EQUALS: 'calculator.equals',
  INVALID: 'calculator.invalid',
  KEY_CLEAR: 'C',
  KEY_EQUALS: '=',
} as const;

export const CALCULATOR_KEYS: Array<{ key: string; wide?: boolean }> = [
  { key: 'C', wide: true },
  { key: '/' },
  { key: '*' },
  { key: '7' },
  { key: '8' },
  { key: '9' },
  { key: '-' },
  { key: '4' },
  { key: '5' },
  { key: '6' },
  { key: '+' },
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '=' },
  { key: '0' },
  { key: '.', wide: true },
];
