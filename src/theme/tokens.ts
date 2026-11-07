import { CLOCK_CONSTANTS } from '../constants/clock';
import { hexToRgba, isHexColor } from '../utils/color';
import { THEME_FONT_STACKS } from './themeFonts';
import type { AppTheme, BentoTokens, ColorSchemeId, ThemeId, ThemeOverrides } from './types';

const DANGER = '#EF4444';

const SURFACES: Record<ColorSchemeId, Pick<BentoTokens, 'bg' | 'surface' | 'surfaceSecondary' | 'border' | 'textPrimary' | 'textSecondary'>> = {
  dark: {
    bg: '#0C0D14',
    surface: '#141622',
    surfaceSecondary: '#1C2030',
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
  },
  light: {
    bg: '#F6F8FA',
    surface: '#FFFFFF',
    surfaceSecondary: '#EEF2F6',
    border: 'rgba(0, 0, 0, 0.06)',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
  },
};

interface AnimePaint {
  accentDark: string;
  accentLight: string;
  glow: string;
  radius: number;
  fontTitle: string;
  fontBody: string;
  clockTagKey: string;
}

const ANIME: Record<ThemeId, AnimePaint> = {
  levelup: {
    accentDark: '#00D2EE',
    accentLight: '#00D2EE',
    glow: '#00D2EE',
    radius: 16,
    fontTitle: THEME_FONT_STACKS.levelup.DISPLAY_BOLD,
    fontBody: THEME_FONT_STACKS.levelup.BODY_MEDIUM,
    clockTagKey: CLOCK_CONSTANTS.TAGS.LEVELUP,
  },
  onePiece: {
    accentDark: '#FFB800',
    accentLight: '#D97706',
    glow: '#FFB800',
    radius: 24,
    fontTitle: THEME_FONT_STACKS.onePiece.DISPLAY_BOLD,
    fontBody: THEME_FONT_STACKS.onePiece.BODY_MEDIUM,
    clockTagKey: CLOCK_CONSTANTS.TAGS.ONE_PIECE,
  },
  naruto: {
    accentDark: '#FF6B00',
    accentLight: '#EA580C',
    glow: '#22C55E',
    radius: 12,
    fontTitle: THEME_FONT_STACKS.naruto.DISPLAY_BOLD,
    fontBody: THEME_FONT_STACKS.naruto.BODY_REGULAR,
    clockTagKey: CLOCK_CONSTANTS.TAGS.NARUTO,
  },
  soloLeveling: {
    accentDark: '#A78BFA',
    accentLight: '#7C3AED',
    glow: '#C4B5FD',
    radius: 16,
    fontTitle: THEME_FONT_STACKS.soloLeveling.DISPLAY_BOLD,
    fontBody: THEME_FONT_STACKS.levelup.BODY_MEDIUM,
    clockTagKey: CLOCK_CONSTANTS.TAGS.SOLO,
  },
};

export const EMPTY_THEME_OVERRIDES: ThemeOverrides = {
  accent: null,
  background: null,
  surface: null,
  text: null,
};

const pickHex = (value: string | null | undefined, fallback: string): string =>
  value && isHexColor(value) ? value.toUpperCase() : fallback;

export const getAppTheme = (
  animeTheme: ThemeId | undefined,
  appearance: ColorSchemeId,
  overrides?: ThemeOverrides | null,
): BentoTokens => {
  const paint = ANIME[animeTheme ?? 'levelup'] ?? ANIME.levelup;
  const surface = SURFACES[appearance] ?? SURFACES.dark;
  const accent = pickHex(overrides?.accent, appearance === 'light' ? paint.accentLight : paint.accentDark);
  return {
    accent,
    accentMuted: hexToRgba(accent, appearance === 'light' ? 0.14 : 0.18),
    glow: paint.glow,
    danger: DANGER,
    radius: paint.radius,
    fontTitle: paint.fontTitle,
    fontBody: paint.fontBody,
    bg: pickHex(overrides?.background, surface.bg),
    surface: pickHex(overrides?.surface, surface.surface),
    surfaceSecondary: surface.surfaceSecondary,
    border: surface.border,
    textPrimary: pickHex(overrides?.text, surface.textPrimary),
    textSecondary: surface.textSecondary,
    clockTagKey: paint.clockTagKey,
  };
};

export const applyBentoTokens = (theme: AppTheme, tokens: BentoTokens): AppTheme => {
  const screen =
    theme.colorScheme === 'light'
      ? ([tokens.surface, tokens.bg, tokens.bg] as const)
      : ([tokens.surfaceSecondary, tokens.bg, tokens.bg] as const);
  return {
    ...theme,
    bento: tokens,
    colors: {
      ...theme.colors,
      BACKGROUND: tokens.bg,
      BACKGROUND_ELEVATED: tokens.surfaceSecondary,
      PANEL: tokens.surface,
      PANEL_ALT: tokens.surfaceSecondary,
      PANEL_BORDER: tokens.border,
      TEXT: tokens.textPrimary,
      TEXT_MUTED: tokens.textSecondary,
      BLUE: tokens.accent,
      BLUE_LIGHT: tokens.accent,
      BLUE_GLOW: tokens.accent,
      BLUE_TINT: tokens.accentMuted,
      GREEN: tokens.glow,
      RED_BRIGHT: tokens.danger,
      GLASS_FILL: tokens.surface,
      GLASS_STROKE: tokens.border,
    },
    accents: {
      ...theme.accents,
      system: tokens.accent,
    },
    gradients: {
      ...theme.gradients,
      BUTTON_PRIMARY: [tokens.accent, tokens.accent],
      SCREEN: screen,
      SYSTEM: [tokens.surfaceSecondary, tokens.bg],
    },
    buttonGradients: {
      ...theme.buttonGradients,
      primary: [tokens.accent, tokens.accent],
    },
    layout: {
      ...theme.layout,
      panelRadius: tokens.radius,
      buttonRadius: tokens.radius,
      panelFrame: 'minimal',
    },
    typography: {
      ...theme.typography,
      fonts: {
        ...theme.typography.fonts,
        DISPLAY_BLACK: tokens.fontTitle,
        DISPLAY_BOLD: tokens.fontTitle,
        DISPLAY_MEDIUM: tokens.fontTitle,
        BODY_MEDIUM: tokens.fontBody,
      },
    },
  };
};
