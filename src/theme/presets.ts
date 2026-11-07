import type { AppTheme, ThemeColors, ThemeGradients, ThemeIcons, ThemeLayout, ThemeMotion, ThemeTypography } from './types';
import { THEME_BACKDROP_ART, THEME_SCREEN_ASSETS } from './themeArt';
import { THEME_FONT_STACKS } from './themeFonts';

const buildTheme = (
  id: AppTheme['id'],
  colors: ThemeColors,
  accents: AppTheme['accents'],
  layout: ThemeLayout,
  motion: ThemeMotion,
  icons: ThemeIcons,
  typography: ThemeTypography,
  screenColors: readonly [string, string, string],
): AppTheme => {
  const gradients: ThemeGradients = {
    SYSTEM: [colors.BLUE_DEEP, colors.BACKGROUND_ELEVATED],
    DANGER: [colors.RED_BLOOD, colors.BACKGROUND_ELEVATED],
    MONARCH: [colors.YELLOW_DEEP, colors.BACKGROUND_ELEVATED],
    HERO_SCRIM: [colors.SCRIM_TOP, colors.SCRIM_MID, colors.SCRIM_BOTTOM],
    BUTTON_PRIMARY: [colors.BLUE, colors.BLUE_DEEP],
    BUTTON_DANGER: [colors.RED_BRIGHT, colors.RED_BLOOD],
    BRAND: [colors.BLUE_LIGHT, colors.YELLOW, colors.RED_BRIGHT],
    SCREEN: screenColors,
  };
  return {
    id,
    colors,
    gradients,
    accents,
    accentTints: {
      system: colors.BLUE_TINT,
      danger: colors.RED_TINT,
      monarch: colors.YELLOW_TINT,
    },
    chipColors: {
      success: colors.GREEN,
      warning: colors.GOLD,
      danger: colors.RED_BRIGHT,
      info: colors.BLUE_LIGHT,
      muted: colors.TEXT_MUTED,
      monarch: colors.YELLOW,
    },
    buttonGradients: {
      primary: gradients.BUTTON_PRIMARY,
      danger: gradients.BUTTON_DANGER,
      ghost: [colors.TRANSPARENT, colors.TRANSPARENT],
    },
    panelGradients: {
      system: gradients.SYSTEM,
      danger: gradients.DANGER,
      monarch: gradients.MONARCH,
    },
    layout,
    motion,
    icons,
    assets: {
      backdropArt: THEME_BACKDROP_ART[id],
      ...THEME_SCREEN_ASSETS[id],
    },
    typography,
  };
};

const LEVELUP_LAYOUT: ThemeLayout = {
  scale: 0.96,
  spacingScale: 0.9,
  contentInset: 14,
  hubGap: 9,
  panelRadius: 6,
  buttonRadius: 4,
  panelFrame: 'corners',
  tabIndicator: 'line',
  tabIconScale: 0.98,
  letterSpacing: 0.8,
};

const ONE_PIECE_LAYOUT: ThemeLayout = {
  scale: 0.98,
  spacingScale: 0.92,
  contentInset: 14,
  hubGap: 10,
  panelRadius: 10,
  buttonRadius: 8,
  panelFrame: 'stripe',
  tabIndicator: 'pill',
  tabIconScale: 1.02,
  letterSpacing: 1,
};

const NARUTO_LAYOUT: ThemeLayout = {
  scale: 0.96,
  spacingScale: 0.88,
  contentInset: 13,
  hubGap: 8,
  panelRadius: 4,
  buttonRadius: 4,
  panelFrame: 'flag',
  tabIndicator: 'line',
  tabIconScale: 0.96,
  letterSpacing: 0.5,
};

const SOLO_LAYOUT: ThemeLayout = {
  scale: 0.94,
  spacingScale: 0.9,
  contentInset: 15,
  hubGap: 11,
  panelRadius: 14,
  buttonRadius: 10,
  panelFrame: 'rounded',
  tabIndicator: 'glow',
  tabIconScale: 0.94,
  letterSpacing: 1.2,
};

const LEVELUP_MOTION: ThemeMotion = {
  backdropDriftMs: 16000,
  backdropShimmerMs: 11000,
  parallaxX: 0.14,
  parallaxY: 0.11,
  touchParallax: 0.22,
  auraPulseMax: 1.06,
  stackAnimation: 'fade_from_bottom',
  pressScale: 0.98,
};

const ONE_PIECE_MOTION: ThemeMotion = {
  backdropDriftMs: 13000,
  backdropShimmerMs: 9000,
  parallaxX: 0.18,
  parallaxY: 0.14,
  touchParallax: 0.26,
  auraPulseMax: 1.08,
  stackAnimation: 'slide_from_right',
  pressScale: 0.96,
};

const NARUTO_MOTION: ThemeMotion = {
  backdropDriftMs: 14000,
  backdropShimmerMs: 12000,
  parallaxX: 0.1,
  parallaxY: 0.08,
  touchParallax: 0.2,
  auraPulseMax: 1.04,
  stackAnimation: 'fade',
  pressScale: 0.99,
};

const SOLO_MOTION: ThemeMotion = {
  backdropDriftMs: 18000,
  backdropShimmerMs: 13000,
  parallaxX: 0.2,
  parallaxY: 0.16,
  touchParallax: 0.28,
  auraPulseMax: 1.1,
  stackAnimation: 'fade_from_bottom',
  pressScale: 0.94,
};

const LEVELUP_ICONS: ThemeIcons = { strokeWidth: 2, activeStrokeWidth: 2.5, filled: false };
const ONE_PIECE_ICONS: ThemeIcons = { strokeWidth: 2.5, activeStrokeWidth: 3, filled: false };
const NARUTO_ICONS: ThemeIcons = { strokeWidth: 2.25, activeStrokeWidth: 2.75, filled: false };
const SOLO_ICONS: ThemeIcons = { strokeWidth: 1.75, activeStrokeWidth: 2.25, filled: false };

const LEVELUP_TYPOGRAPHY: ThemeTypography = {
  fonts: THEME_FONT_STACKS.levelup,
  sizeScale: 0.94,
  displayLetterSpacing: 0.8,
  bodyLetterSpacing: 0,
  lineHeightScale: 1.02,
};

const ONE_PIECE_TYPOGRAPHY: ThemeTypography = {
  fonts: THEME_FONT_STACKS.onePiece,
  sizeScale: 0.96,
  displayLetterSpacing: 1.1,
  bodyLetterSpacing: 0.15,
  lineHeightScale: 1.04,
};

const NARUTO_TYPOGRAPHY: ThemeTypography = {
  fonts: THEME_FONT_STACKS.naruto,
  sizeScale: 0.93,
  displayLetterSpacing: 0.4,
  bodyLetterSpacing: 0,
  lineHeightScale: 1.06,
};

const SOLO_TYPOGRAPHY: ThemeTypography = {
  fonts: THEME_FONT_STACKS.soloLeveling,
  sizeScale: 0.92,
  displayLetterSpacing: 1.4,
  bodyLetterSpacing: 0.25,
  lineHeightScale: 1.04,
};

const LEVELUP_COLORS: ThemeColors = {
  BACKGROUND: '#05060A',
  BACKGROUND_ELEVATED: '#0D0F17',
  PANEL: '#141826',
  PANEL_ALT: '#10131E',
  PANEL_BORDER: '#1E2A44',
  BLUE: '#1E90FF',
  BLUE_LIGHT: '#3FA9FF',
  BLUE_GLOW: '#00C2FF',
  BLUE_DEEP: '#0B3A75',
  BLUE_TINT: 'rgba(30, 144, 255, 0.14)',
  RED: '#C1121F',
  RED_BRIGHT: '#E5383B',
  RED_BLOOD: '#7A0010',
  RED_GLOW: '#FF2E4D',
  RED_TINT: 'rgba(229, 56, 59, 0.14)',
  YELLOW: '#F5C518',
  YELLOW_DEEP: '#C4920A',
  YELLOW_TINT: 'rgba(245, 197, 24, 0.16)',
  VIOLET: '#7B2CFF',
  VIOLET_GLOW: '#A66BFF',
  VIOLET_TINT: 'rgba(123, 44, 255, 0.16)',
  GOLD: '#F5C518',
  GREEN: '#2ED47A',
  TEXT: '#E8ECF5',
  TEXT_MUTED: '#8A93A8',
  TEXT_DIM: '#5A6378',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
  SCRIM_TOP: 'rgba(5, 6, 10, 0.05)',
  SCRIM_MID: 'rgba(5, 6, 10, 0.55)',
  SCRIM_BOTTOM: 'rgba(5, 6, 10, 0.98)',
  SCRIM_FULL: 'rgba(5, 6, 10, 0.92)',
  OVERLAY_DARK: 'rgba(0, 0, 0, 0.6)',
};

const ONE_PIECE_COLORS: ThemeColors = {
  ...LEVELUP_COLORS,
  BACKGROUND: '#020814',
  BACKGROUND_ELEVATED: '#081428',
  PANEL: '#0C1A32',
  PANEL_ALT: '#102038',
  PANEL_BORDER: '#2A4A78',
  BLUE: '#1A6FD4',
  BLUE_LIGHT: '#4DA3FF',
  BLUE_GLOW: '#2E8CFF',
  BLUE_DEEP: '#0A3566',
  BLUE_TINT: 'rgba(77, 163, 255, 0.16)',
  RED: '#D62828',
  RED_BRIGHT: '#F94144',
  RED_BLOOD: '#8B0000',
  RED_TINT: 'rgba(249, 65, 68, 0.14)',
  YELLOW: '#F9C74F',
  YELLOW_DEEP: '#E09F1A',
  YELLOW_TINT: 'rgba(249, 199, 79, 0.18)',
  GOLD: '#F9C74F',
  SCRIM_TOP: 'rgba(4, 6, 12, 0.05)',
  SCRIM_MID: 'rgba(4, 6, 12, 0.55)',
  SCRIM_BOTTOM: 'rgba(4, 6, 12, 0.98)',
  SCRIM_FULL: 'rgba(4, 6, 12, 0.92)',
};

const NARUTO_COLORS: ThemeColors = {
  ...LEVELUP_COLORS,
  BACKGROUND: '#120C08',
  BACKGROUND_ELEVATED: '#1C1410',
  PANEL: '#241C14',
  PANEL_ALT: '#2A2016',
  PANEL_BORDER: '#6B3F1E',
  BLUE: '#1D3557',
  BLUE_LIGHT: '#4A6FA5',
  BLUE_GLOW: '#457B9D',
  BLUE_DEEP: '#0F1E33',
  BLUE_TINT: 'rgba(74, 111, 165, 0.16)',
  RED: '#9D0208',
  RED_BRIGHT: '#E85D04',
  RED_BLOOD: '#6A040F',
  RED_GLOW: '#FF6B35',
  RED_TINT: 'rgba(232, 93, 4, 0.16)',
  YELLOW: '#FF9F1C',
  YELLOW_DEEP: '#F3722C',
  YELLOW_TINT: 'rgba(255, 159, 28, 0.18)',
  VIOLET: '#5C4033',
  VIOLET_GLOW: '#8B5E3C',
  VIOLET_TINT: 'rgba(139, 94, 60, 0.14)',
  GREEN: '#52B788',
  SCRIM_TOP: 'rgba(6, 5, 4, 0.05)',
  SCRIM_MID: 'rgba(6, 5, 4, 0.55)',
  SCRIM_BOTTOM: 'rgba(6, 5, 4, 0.98)',
  SCRIM_FULL: 'rgba(6, 5, 4, 0.92)',
};

const SOLO_LEVELING_COLORS: ThemeColors = {
  ...LEVELUP_COLORS,
  BACKGROUND: '#020106',
  BACKGROUND_ELEVATED: '#0A0616',
  PANEL: '#160F28',
  PANEL_ALT: '#1A1230',
  PANEL_BORDER: '#4A2F8C',
  BLUE: '#3A86FF',
  BLUE_LIGHT: '#7EB8FF',
  BLUE_GLOW: '#00E5FF',
  BLUE_DEEP: '#14213D',
  BLUE_TINT: 'rgba(0, 229, 255, 0.12)',
  RED: '#9D4EDD',
  RED_BRIGHT: '#C77DFF',
  RED_BLOOD: '#5A189A',
  RED_GLOW: '#E0AAFF',
  RED_TINT: 'rgba(157, 78, 221, 0.16)',
  YELLOW: '#B8C0FF',
  YELLOW_DEEP: '#7B2CBF',
  YELLOW_TINT: 'rgba(183, 148, 255, 0.18)',
  VIOLET: '#7B2CBF',
  VIOLET_GLOW: '#C77DFF',
  VIOLET_TINT: 'rgba(123, 44, 191, 0.22)',
  GOLD: '#E0AAFF',
  GREEN: '#56CFE1',
  SCRIM_TOP: 'rgba(3, 2, 8, 0.05)',
  SCRIM_MID: 'rgba(3, 2, 8, 0.55)',
  SCRIM_BOTTOM: 'rgba(3, 2, 8, 0.98)',
  SCRIM_FULL: 'rgba(3, 2, 8, 0.92)',
};

const LEVELUP_SCREEN = [LEVELUP_COLORS.BLUE_DEEP, LEVELUP_COLORS.BACKGROUND_ELEVATED, LEVELUP_COLORS.BACKGROUND] as const;
const ONE_PIECE_SCREEN = ['#0E2848', ONE_PIECE_COLORS.BACKGROUND_ELEVATED, ONE_PIECE_COLORS.BACKGROUND] as const;
const NARUTO_SCREEN = ['#3D2814', NARUTO_COLORS.BACKGROUND_ELEVATED, NARUTO_COLORS.BACKGROUND] as const;
const SOLO_SCREEN = ['#1A0F38', SOLO_LEVELING_COLORS.BACKGROUND_ELEVATED, SOLO_LEVELING_COLORS.BACKGROUND] as const;

export const THEME_PRESETS: Record<AppTheme['id'], AppTheme> = {
  levelup: buildTheme(
    'levelup',
    LEVELUP_COLORS,
    {
      system: LEVELUP_COLORS.BLUE,
      danger: LEVELUP_COLORS.RED_BRIGHT,
      monarch: LEVELUP_COLORS.YELLOW,
    },
    LEVELUP_LAYOUT,
    LEVELUP_MOTION,
    LEVELUP_ICONS,
    LEVELUP_TYPOGRAPHY,
    LEVELUP_SCREEN,
  ),
  onePiece: buildTheme(
    'onePiece',
    ONE_PIECE_COLORS,
    {
      system: ONE_PIECE_COLORS.BLUE_LIGHT,
      danger: ONE_PIECE_COLORS.RED_BRIGHT,
      monarch: ONE_PIECE_COLORS.YELLOW,
    },
    ONE_PIECE_LAYOUT,
    ONE_PIECE_MOTION,
    ONE_PIECE_ICONS,
    ONE_PIECE_TYPOGRAPHY,
    ONE_PIECE_SCREEN,
  ),
  naruto: buildTheme(
    'naruto',
    NARUTO_COLORS,
    {
      system: NARUTO_COLORS.YELLOW,
      danger: NARUTO_COLORS.RED_BRIGHT,
      monarch: NARUTO_COLORS.GREEN,
    },
    NARUTO_LAYOUT,
    NARUTO_MOTION,
    NARUTO_ICONS,
    NARUTO_TYPOGRAPHY,
    NARUTO_SCREEN,
  ),
  soloLeveling: buildTheme(
    'soloLeveling',
    SOLO_LEVELING_COLORS,
    {
      system: SOLO_LEVELING_COLORS.BLUE_GLOW,
      danger: SOLO_LEVELING_COLORS.VIOLET_GLOW,
      monarch: SOLO_LEVELING_COLORS.YELLOW,
    },
    SOLO_LAYOUT,
    SOLO_MOTION,
    SOLO_ICONS,
    SOLO_TYPOGRAPHY,
    SOLO_SCREEN,
  ),
};

export const DEFAULT_THEME_ID: AppTheme['id'] = 'levelup';

export const themeById = (id: AppTheme['id'] | undefined): AppTheme =>
  THEME_PRESETS[id ?? DEFAULT_THEME_ID] ?? THEME_PRESETS.levelup;
