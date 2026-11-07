import type { ButtonVariant, ChipVariant, PanelVariant } from '../types';

export type ThemeId = 'levelup' | 'onePiece' | 'naruto' | 'soloLeveling';

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
  colors: ThemeColors;
  gradients: ThemeGradients;
  accents: Record<PanelVariant, string>;
  accentTints: Record<PanelVariant, string>;
  chipColors: Record<ChipVariant, string>;
  buttonGradients: Record<ButtonVariant, readonly string[]>;
  panelGradients: Record<PanelVariant, readonly string[]>;
}
