import type { ThemeFontFamilies } from './types';

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

export const THEME_FONT_STACKS = {
  levelup: RAJDHANI_STACK,
  onePiece: ORBITRON_HUD,
  naruto: NARUTO_STACK,
  soloLeveling: SOLO_ORBITRON,
} as const;
