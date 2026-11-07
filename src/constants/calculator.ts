export const CALCULATOR_RULES = {
  MAX_LENGTH: 32,
} as const;

export const CALCULATOR_CONSTANTS = {
  TITLE: 'calculator.title',
  SUBTITLE: 'calculator.subtitle',
  HINT: 'calculator.hint',
  DISPLAY_PLACEHOLDER: 'calculator.displayPlaceholder',
  SAVE: 'calculator.save',
  LABEL: 'calculator.label',
  LABEL_PLACEHOLDER: 'calculator.labelPlaceholder',
  LABEL_REQUIRED: 'calculator.labelRequired',
  HISTORY: 'calculator.history',
  HISTORY_EMPTY: 'calculator.historyEmpty',
  CLEAR: 'calculator.clear',
  EQUALS: 'calculator.equals',
  INVALID: 'calculator.invalid',
  DELETE_TITLE: 'calculator.deleteTitle',
  DELETE_BODY: 'calculator.deleteBody',
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
