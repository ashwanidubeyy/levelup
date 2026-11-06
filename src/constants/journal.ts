import { COLORS } from '../theme/colors';

export const JOURNAL_CONSTANTS = {
  TITLE: 'journal.title',
  SUBTITLE: 'journal.subtitle',
  EMPTY: 'journal.empty',
  NEW_TITLE: 'journal.newTitle',
  EDIT_TITLE: 'journal.editTitle',
  FORMS: {
    LABELS: {
      TITLE: 'journal.titleLabel',
      BODY: 'journal.bodyLabel',
      MOOD: 'journal.mood',
    },
    PLACEHOLDERS: {
      TITLE: 'journal.titlePlaceholder',
      BODY: 'journal.bodyPlaceholder',
    },
    VALIDATION: {
      BODY_REQUIRED: 'journal.validation.bodyRequired',
    },
  },
  MODAL: {
    DELETE_TITLE: 'journal.deleteTitle',
    DELETE_BODY: 'journal.deleteBody',
  },
  UNTITLED: 'journal.untitled',
  MOOD_OPTIONS: [
    { value: 'radiant', labelKey: 'journal.moods.radiant', color: COLORS.GOLD },
    { value: 'focused', labelKey: 'journal.moods.focused', color: COLORS.BLUE_LIGHT },
    { value: 'neutral', labelKey: 'journal.moods.neutral', color: COLORS.TEXT_MUTED },
    { value: 'drained', labelKey: 'journal.moods.drained', color: COLORS.VIOLET_GLOW },
    { value: 'defeated', labelKey: 'journal.moods.defeated', color: COLORS.RED_BRIGHT },
  ],
  DEFAULT_MOOD: 'focused',
  TITLE_MAX_LENGTH: 80,
  BODY_MAX_LENGTH: 8000,
  PREVIEW_LINES: 3,
} as const;
