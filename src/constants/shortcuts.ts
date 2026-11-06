export const SHORTCUT_TARGETS = [
  {
    id: 'whatsapp',
    labelKey: 'home.shortcuts.whatsapp',
    app: 'whatsapp://',
    web: 'https://wa.me/',
  },
  {
    id: 'gmail',
    labelKey: 'home.shortcuts.gmail',
    app: 'googlegmail://',
    web: 'https://mail.google.com/mail/u/0/#inbox',
  },
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
