export const NOTE_RULES = {
  TITLE_MAX: 80,
  DESCRIPTION_MAX: 4000,
} as const;

export const NOTE_CONSTANTS = {
  TITLE: 'notes.title',
  SUBTITLE: 'notes.subtitle',
  EMPTY: 'notes.empty',
  NEW_TITLE: 'notes.newTitle',
  EDIT_TITLE: 'notes.editTitle',
  FORMS: {
    LABELS: {
      TITLE: 'notes.titleLabel',
      DESCRIPTION: 'notes.descriptionLabel',
      DATE: 'notes.date',
    },
    PLACEHOLDERS: {
      TITLE: 'notes.titlePlaceholder',
      DESCRIPTION: 'notes.descriptionPlaceholder',
    },
    VALIDATION: {
      TITLE_REQUIRED: 'notes.validation.titleRequired',
      DESCRIPTION_REQUIRED: 'notes.validation.descriptionRequired',
    },
  },
  MODAL: {
    DELETE_TITLE: 'notes.deleteTitle',
    DELETE_BODY: 'notes.deleteBody',
  },
} as const;
