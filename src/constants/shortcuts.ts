export const SHORTCUT_TARGETS = [
  {
    id: 'instagram',
    labelKey: 'home.shortcuts.instagram',
    app: 'instagram://app',
    web: 'https://www.instagram.com/',
  },
] as const;

export const HOME_RULES = {
  UPCOMING_LIMIT: 8,
  JOURNAL_PREVIEW: 90,
} as const;
