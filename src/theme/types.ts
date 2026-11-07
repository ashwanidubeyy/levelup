import type { ImageSourcePropType } from 'react-native';
import type { ButtonVariant, ChipVariant, PanelVariant } from '../types';

export type ThemeId = 'levelup' | 'onePiece' | 'naruto' | 'soloLeveling';

export type ColorSchemeId = 'dark' | 'light';

export type ThemePanelFrame = 'corners' | 'minimal' | 'rounded' | 'stripe' | 'flag';

export type ThemeTabIndicator = 'line' | 'pill' | 'glow';

export type ThemeStackAnimation = 'fade_from_bottom' | 'slide_from_right' | 'fade';

export interface ThemeLayout {
  scale: number;
  spacingScale: number;
  contentInset: number;
  hubGap: number;
  panelRadius: number;
  buttonRadius: number;
  panelFrame: ThemePanelFrame;
  tabIndicator: ThemeTabIndicator;
  tabIconScale: number;
  letterSpacing: number;
}

export interface ThemeMotion {
  backdropDriftMs: number;
  backdropShimmerMs: number;
  parallaxX: number;
  parallaxY: number;
  touchParallax: number;
  auraPulseMax: number;
  stackAnimation: ThemeStackAnimation;
  pressScale: number;
}

export interface ThemeIcons {
  strokeWidth: number;
  activeStrokeWidth: number;
  filled: boolean;
}

export interface ThemeAssets {
  backdropArt: ImageSourcePropType[];
  settingsBanner: ImageSourcePropType;
  statsBanner: ImageSourcePropType;
  journalBanner: ImageSourcePropType;
  questsBanner: ImageSourcePropType;
}

export interface ThemeFontFamilies {
  DISPLAY_BLACK: string;
  DISPLAY_BOLD: string;
  DISPLAY_MEDIUM: string;
  BODY_REGULAR: string;
  BODY_MEDIUM: string;
  BODY_SEMIBOLD: string;
  BODY_BOLD: string;
}

export interface ThemeTypography {
  fonts: ThemeFontFamilies;
  sizeScale: number;
  displayLetterSpacing: number;
  bodyLetterSpacing: number;
  lineHeightScale: number;
}

export interface ThemeColors {
  BACKGROUND: string;
  BACKGROUND_ELEVATED: string;
  PANEL: string;
  PANEL_ALT: string;
  PANEL_BORDER: string;
  BLUE: string;
  BLUE_LIGHT: string;
  BLUE_GLOW: string;
  BLUE_DEEP: string;
  BLUE_TINT: string;
  RED: string;
  RED_BRIGHT: string;
  RED_BLOOD: string;
  RED_GLOW: string;
  RED_TINT: string;
  YELLOW: string;
  YELLOW_DEEP: string;
  YELLOW_TINT: string;
  VIOLET: string;
  VIOLET_GLOW: string;
  VIOLET_TINT: string;
  GOLD: string;
  GREEN: string;
  TEXT: string;
  TEXT_MUTED: string;
  TEXT_DIM: string;
  WHITE: string;
  BLACK: string;
  TRANSPARENT: string;
  SCRIM_TOP: string;
  SCRIM_MID: string;
  SCRIM_BOTTOM: string;
  SCRIM_FULL: string;
  OVERLAY_DARK: string;
  GLASS_FILL: string;
  GLASS_STROKE: string;
  GLASS_HIGHLIGHT: string;
}

export interface ThemeGradients {
  SYSTEM: readonly string[];
  DANGER: readonly string[];
  MONARCH: readonly string[];
  HERO_SCRIM: readonly string[];
  BUTTON_PRIMARY: readonly string[];
  BUTTON_DANGER: readonly string[];
  BRAND: readonly string[];
  SCREEN: readonly string[];
}

export interface AppTheme {
  id: ThemeId;
  colorScheme: ColorSchemeId;
  colors: ThemeColors;
  gradients: ThemeGradients;
  accents: Record<PanelVariant, string>;
  accentTints: Record<PanelVariant, string>;
  chipColors: Record<ChipVariant, string>;
  buttonGradients: Record<ButtonVariant, readonly string[]>;
  panelGradients: Record<PanelVariant, readonly string[]>;
  layout: ThemeLayout;
  motion: ThemeMotion;
  icons: ThemeIcons;
  assets: ThemeAssets;
  typography: ThemeTypography;
}
