import type { ColorSchemeId, FontId, ThemeId } from '../theme/types';

export const THEME_OPTIONS: Array<{ id: ThemeId; labelKey: string; hintKey: string }> = [
  { id: 'levelup', labelKey: 'settings.theme.levelup', hintKey: 'settings.theme.levelupHint' },
  { id: 'onePiece', labelKey: 'settings.theme.onePiece', hintKey: 'settings.theme.onePieceHint' },
  { id: 'naruto', labelKey: 'settings.theme.naruto', hintKey: 'settings.theme.narutoHint' },
  { id: 'soloLeveling', labelKey: 'settings.theme.soloLeveling', hintKey: 'settings.theme.soloLevelingHint' },
] as const;

export const APPEARANCE_OPTIONS: Array<{ value: ColorSchemeId; labelKey: string }> = [
  { value: 'dark', labelKey: 'settings.appearance.dark' },
  { value: 'light', labelKey: 'settings.appearance.light' },
] as const;

export const FONT_OPTIONS: Array<{ value: FontId; labelKey: string }> = [
  { value: 'minimal', labelKey: 'settings.font.minimal' },
  { value: 'rajdhani', labelKey: 'settings.font.rajdhani' },
  { value: 'orbitron', labelKey: 'settings.font.orbitron' },
] as const;

export const THEME_CONSTANTS = {
  TITLE: 'settings.theme.title',
  HINT: 'settings.theme.hint',
  APPEARANCE_TITLE: 'settings.appearance.title',
  APPEARANCE_HINT: 'settings.appearance.hint',
  STUDIO_TITLE: 'settings.theme.studioTitle',
  STUDIO_SUBTITLE: 'settings.theme.studioSubtitle',
  STUDIO_HINT: 'settings.theme.studioHint',
  STUDIO_OPEN: 'settings.theme.studioOpen',
  ACCENT: 'settings.theme.accent',
  BACKGROUND: 'settings.theme.background',
  SURFACE: 'settings.theme.surface',
  TEXT: 'settings.theme.text',
  RESET: 'settings.theme.reset',
  PREVIEW: 'settings.theme.preview',
  FONT_TITLE: 'settings.font.title',
  FONT_HINT: 'settings.font.hint',
} as const;

export const THEME_COLOR_SWATCHES = {
  ACCENT: ['#00D2EE', '#FFB800', '#D97706', '#FF6B00', '#EA580C', '#22C55E', '#A78BFA', '#F43F5E'],
  BACKGROUND: ['#0C0D14', '#141622', '#F6F8FA', '#FFFFFF', '#FFF7EB', '#0F172A'],
  SURFACE: ['#141622', '#1C2030', '#FFFFFF', '#FFFDF9', '#111827', '#F8FAFC'],
  TEXT: ['#F8FAFC', '#0F172A', '#1A1208', '#E2E8F0'],
} as const;
