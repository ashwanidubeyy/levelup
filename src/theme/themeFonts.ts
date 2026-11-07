import { Platform } from 'react-native';
import type { AppTheme, FontId, ThemeFontFamilies } from './types';

const RAJDHANI_STACK: ThemeFontFamilies = {
  DISPLAY_BLACK: 'Rajdhani-Bold',
  DISPLAY_BOLD: 'Rajdhani-Bold',
  DISPLAY_MEDIUM: 'Rajdhani-SemiBold',
  BODY_REGULAR: 'Rajdhani-Regular',
  BODY_MEDIUM: 'Rajdhani-Medium',
  BODY_SEMIBOLD: 'Rajdhani-SemiBold',
  BODY_BOLD: 'Rajdhani-Bold',
};

const ORBITRON_HUD: ThemeFontFamilies = {
  DISPLAY_BLACK: 'Orbitron-Black',
  DISPLAY_BOLD: 'Orbitron-Bold',
  DISPLAY_MEDIUM: 'Orbitron-Medium',
  BODY_REGULAR: 'Rajdhani-Regular',
  BODY_MEDIUM: 'Rajdhani-Medium',
  BODY_SEMIBOLD: 'Rajdhani-SemiBold',
  BODY_BOLD: 'Rajdhani-Bold',
};

const NARUTO_STACK: ThemeFontFamilies = {
  DISPLAY_BLACK: 'Rajdhani-Bold',
  DISPLAY_BOLD: 'Rajdhani-Bold',
  DISPLAY_MEDIUM: 'Rajdhani-Medium',
  BODY_REGULAR: 'Rajdhani-Regular',
  BODY_MEDIUM: 'Rajdhani-Regular',
  BODY_SEMIBOLD: 'Rajdhani-Medium',
  BODY_BOLD: 'Rajdhani-SemiBold',
};

const SOLO_ORBITRON: ThemeFontFamilies = {
  DISPLAY_BLACK: 'Orbitron-Black',
  DISPLAY_BOLD: 'Orbitron-Bold',
  DISPLAY_MEDIUM: 'Orbitron-Medium',
  BODY_REGULAR: 'Orbitron-Medium',
  BODY_MEDIUM: 'Orbitron-Medium',
  BODY_SEMIBOLD: 'Orbitron-Bold',
  BODY_BOLD: 'Orbitron-Bold',
};

const SYSTEM_FAMILY = Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }) ?? 'System';

const MINIMAL_STACK: ThemeFontFamilies = {
  DISPLAY_BLACK: SYSTEM_FAMILY,
  DISPLAY_BOLD: SYSTEM_FAMILY,
  DISPLAY_MEDIUM: SYSTEM_FAMILY,
  BODY_REGULAR: SYSTEM_FAMILY,
  BODY_MEDIUM: SYSTEM_FAMILY,
  BODY_SEMIBOLD: SYSTEM_FAMILY,
  BODY_BOLD: SYSTEM_FAMILY,
};

export const THEME_FONT_STACKS = {
  levelup: RAJDHANI_STACK,
  onePiece: ORBITRON_HUD,
  naruto: NARUTO_STACK,
  soloLeveling: SOLO_ORBITRON,
  minimal: MINIMAL_STACK,
} as const;

const stackForFont = (fontId: FontId): ThemeFontFamilies => {
  if (fontId === 'rajdhani') {
    return THEME_FONT_STACKS.levelup;
  }
  if (fontId === 'orbitron') {
    return THEME_FONT_STACKS.soloLeveling;
  }
  return THEME_FONT_STACKS.minimal;
};

export const applyFontChoice = (theme: AppTheme, fontId: FontId | undefined): AppTheme => {
  const id = fontId ?? 'minimal';
  const fonts = stackForFont(id);
  const minimal = id === 'minimal';
  return {
    ...theme,
    bento: {
      ...theme.bento,
      fontTitle: fonts.DISPLAY_BOLD,
      fontBody: fonts.BODY_MEDIUM,
    },
    typography: {
      ...theme.typography,
      fonts,
      displayLetterSpacing: minimal ? 0 : theme.typography.displayLetterSpacing,
      bodyLetterSpacing: minimal ? 0 : theme.typography.bodyLetterSpacing,
    },
  };
};
