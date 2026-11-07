import type { AppTheme } from '../theme/types';
import type { ButtonVariant, ChipVariant, PanelVariant } from '../types';
import { themeById } from '../theme/presets';

const fallback = themeById('levelup');

export const accentFor = (variant: PanelVariant = 'system', theme?: AppTheme): string =>
  theme?.accents[variant] ?? fallback.accents[variant];

export const tintFor = (variant: PanelVariant = 'system', theme?: AppTheme): string =>
  theme?.accentTints[variant] ?? fallback.accentTints[variant];

export const chipColorFor = (variant: ChipVariant, theme?: AppTheme): string =>
  theme?.chipColors[variant] ?? fallback.chipColors[variant];

export const buttonGradientFor = (variant: ButtonVariant, theme?: AppTheme): readonly string[] =>
  theme?.buttonGradients[variant] ?? fallback.buttonGradients[variant];

export const panelGradientFor = (variant: PanelVariant, theme?: AppTheme): readonly string[] =>
  theme?.panelGradients[variant] ?? fallback.panelGradients[variant];
