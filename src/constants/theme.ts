import type { ThemeId } from '../theme/types';

export const THEME_OPTIONS: Array<{ id: ThemeId; labelKey: string; hintKey: string }> = [
  { id: 'levelup', labelKey: 'settings.theme.levelup', hintKey: 'settings.theme.levelupHint' },
  { id: 'onePiece', labelKey: 'settings.theme.onePiece', hintKey: 'settings.theme.onePieceHint' },
  { id: 'naruto', labelKey: 'settings.theme.naruto', hintKey: 'settings.theme.narutoHint' },
  { id: 'soloLeveling', labelKey: 'settings.theme.soloLeveling', hintKey: 'settings.theme.soloLevelingHint' },
] as const;

export const THEME_CONSTANTS = {
  TITLE: 'settings.theme.title',
  HINT: 'settings.theme.hint',
} as const;
