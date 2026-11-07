import type { AppTheme, ColorSchemeId, ThemeColors, ThemeId } from './types';
import { themeById } from './presets';

const DARK_GLASS: Pick<ThemeColors, 'GLASS_FILL' | 'GLASS_STROKE' | 'GLASS_HIGHLIGHT'> = {
  GLASS_FILL: 'rgba(16, 20, 32, 0.78)',
  GLASS_STROKE: 'rgba(255, 255, 255, 0.18)',
  GLASS_HIGHLIGHT: 'rgba(255, 255, 255, 0.08)',
};

const LIGHT_GLASS: Pick<ThemeColors, 'GLASS_FILL' | 'GLASS_STROKE' | 'GLASS_HIGHLIGHT'> = {
  GLASS_FILL: 'rgba(255, 255, 255, 0.82)',
  GLASS_STROKE: 'rgba(15, 20, 35, 0.1)',
  GLASS_HIGHLIGHT: 'rgba(255, 255, 255, 0.55)',
};

const LIGHT_SURFACES: Record<ThemeId, Partial<ThemeColors>> = {
  levelup: {
    BACKGROUND: '#E9EEF8',
    BACKGROUND_ELEVATED: '#F4F7FC',
    PANEL: '#FFFFFF',
    PANEL_ALT: '#F0F4FA',
    PANEL_BORDER: '#D2DAE8',
    TEXT: '#0E1220',
    TEXT_MUTED: '#5A6478',
    TEXT_DIM: '#8891A3',
    SCRIM_TOP: 'rgba(255, 255, 255, 0.05)',
    SCRIM_MID: 'rgba(14, 18, 32, 0.35)',
    SCRIM_BOTTOM: 'rgba(14, 18, 32, 0.92)',
    SCRIM_FULL: 'rgba(14, 18, 32, 0.88)',
    OVERLAY_DARK: 'rgba(14, 18, 32, 0.45)',
  },
  onePiece: {
    BACKGROUND: '#FFF7EB',
    BACKGROUND_ELEVATED: '#FFFDF9',
    PANEL: '#FFFFFF',
    PANEL_ALT: '#FFF3E0',
    PANEL_BORDER: '#E8D4B8',
    TEXT: '#1A1208',
    TEXT_MUTED: '#6B5640',
    TEXT_DIM: '#9A8060',
    SCRIM_TOP: 'rgba(255, 255, 255, 0.12)',
    SCRIM_MID: 'rgba(26, 18, 8, 0.38)',
    SCRIM_BOTTOM: 'rgba(26, 18, 8, 0.92)',
    SCRIM_FULL: 'rgba(26, 18, 8, 0.88)',
    OVERLAY_DARK: 'rgba(26, 18, 8, 0.45)',
  },
  naruto: {
    BACKGROUND: '#FFF4E8',
    BACKGROUND_ELEVATED: '#FFFAF4',
    PANEL: '#FFFFFF',
    PANEL_ALT: '#FFF0E0',
    PANEL_BORDER: '#E8C9A8',
    TEXT: '#1C1008',
    TEXT_MUTED: '#7A5030',
    TEXT_DIM: '#A67850',
    SCRIM_TOP: 'rgba(255, 255, 255, 0.1)',
    SCRIM_MID: 'rgba(28, 16, 8, 0.38)',
    SCRIM_BOTTOM: 'rgba(28, 16, 8, 0.92)',
    SCRIM_FULL: 'rgba(28, 16, 8, 0.88)',
    OVERLAY_DARK: 'rgba(28, 16, 8, 0.45)',
  },
  soloLeveling: {
    BACKGROUND: '#ECECF6',
    BACKGROUND_ELEVATED: '#F6F6FC',
    PANEL: '#FFFFFF',
    PANEL_ALT: '#EEEEF8',
    PANEL_BORDER: '#C8C8DC',
    TEXT: '#0C0C14',
    TEXT_MUTED: '#5A5A72',
    TEXT_DIM: '#8888A0',
    SCRIM_TOP: 'rgba(255, 255, 255, 0.08)',
    SCRIM_MID: 'rgba(12, 12, 20, 0.4)',
    SCRIM_BOTTOM: 'rgba(12, 12, 20, 0.94)',
    SCRIM_FULL: 'rgba(12, 12, 20, 0.9)',
    OVERLAY_DARK: 'rgba(12, 12, 20, 0.5)',
  },
};

const lightScreenGradient = (id: ThemeId): readonly [string, string, string] => {
  switch (id) {
    case 'onePiece':
      return ['#FFFDF9', '#FFF7EB', '#FFE8CC'];
    case 'naruto':
      return ['#FFFAF4', '#FFF4E8', '#FFE4C8'];
    case 'soloLeveling':
      return ['#F8F8FF', '#ECECF6', '#D8D8EC'];
    default:
      return ['#F8FAFF', '#E9EEF8', '#DCE4F4'];
  }
};

export const withChromeColors = (colors: ThemeColors): ThemeColors => ({
  ...colors,
  ...DARK_GLASS,
});

export const applyColorScheme = (theme: AppTheme, scheme: ColorSchemeId): AppTheme => {
  if (scheme === 'dark') {
    return { ...theme, colorScheme: scheme, colors: { ...theme.colors, ...DARK_GLASS } };
  }
  const surface = LIGHT_SURFACES[theme.id] ?? LIGHT_SURFACES.levelup;
  return {
    ...theme,
    colorScheme: scheme,
    colors: {
      ...theme.colors,
      ...surface,
      ...LIGHT_GLASS,
    },
    gradients: {
      ...theme.gradients,
      SCREEN: lightScreenGradient(theme.id),
    },
  };
};

export const resolveAppTheme = (id: ThemeId | undefined, scheme: ColorSchemeId): AppTheme => {
  const base: AppTheme = { ...themeById(id), colorScheme: scheme };
  return applyColorScheme(base, scheme);
};
