import { COLORS, GRADIENTS } from '../theme/colors';
import type { ButtonVariant, ChipVariant, PanelVariant } from '../types';

const PANEL_ACCENTS: Record<PanelVariant, string> = {
  system: COLORS.BLUE,
  danger: COLORS.RED_BRIGHT,
  monarch: COLORS.VIOLET_GLOW,
};

const PANEL_TINTS: Record<PanelVariant, string> = {
  system: COLORS.BLUE_TINT,
  danger: COLORS.RED_TINT,
  monarch: COLORS.VIOLET_TINT,
};

const CHIP_COLORS: Record<ChipVariant, string> = {
  success: COLORS.GREEN,
  warning: COLORS.GOLD,
  danger: COLORS.RED_BRIGHT,
  info: COLORS.BLUE_LIGHT,
  muted: COLORS.TEXT_MUTED,
  monarch: COLORS.VIOLET_GLOW,
};

const BUTTON_GRADIENTS: Record<ButtonVariant, readonly string[]> = {
  primary: GRADIENTS.BUTTON_PRIMARY,
  danger: GRADIENTS.BUTTON_DANGER,
  ghost: [COLORS.TRANSPARENT, COLORS.TRANSPARENT],
};

const PANEL_GRADIENTS: Record<PanelVariant, readonly string[]> = {
  system: GRADIENTS.SYSTEM,
  danger: GRADIENTS.DANGER,
  monarch: GRADIENTS.MONARCH,
};

export const accentFor = (variant: PanelVariant = 'system'): string => PANEL_ACCENTS[variant];

export const tintFor = (variant: PanelVariant = 'system'): string => PANEL_TINTS[variant];

export const chipColorFor = (variant: ChipVariant): string => CHIP_COLORS[variant];

export const buttonGradientFor = (variant: ButtonVariant): readonly string[] => BUTTON_GRADIENTS[variant];

export const panelGradientFor = (variant: PanelVariant): readonly string[] => PANEL_GRADIENTS[variant];
