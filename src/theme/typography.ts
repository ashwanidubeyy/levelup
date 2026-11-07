import { moderateScale } from 'react-native-size-matters';
import type { AppTheme } from './types';
import { THEME_FONT_STACKS } from './themeFonts';

export const BASE_FONT_SIZES = {
  XXS: 10,
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 22,
  XXL: 28,
  HUGE: 44,
  GIANT: 64,
} as const;

export type FontSizeKey = keyof typeof BASE_FONT_SIZES;

export const themeFontSize = (theme: AppTheme, key: FontSizeKey): number =>
  moderateScale(BASE_FONT_SIZES[key] * theme.typography.sizeScale, 0.9);

export const FONTS = THEME_FONT_STACKS.levelup;

export const FONT_SIZES = {
  XXS: moderateScale(BASE_FONT_SIZES.XXS, 0.9),
  XS: moderateScale(BASE_FONT_SIZES.XS, 0.9),
  SM: moderateScale(BASE_FONT_SIZES.SM, 0.9),
  MD: moderateScale(BASE_FONT_SIZES.MD, 0.9),
  LG: moderateScale(BASE_FONT_SIZES.LG, 0.9),
  XL: moderateScale(BASE_FONT_SIZES.XL, 0.9),
  XXL: moderateScale(BASE_FONT_SIZES.XXL, 0.9),
  HUGE: moderateScale(BASE_FONT_SIZES.HUGE, 0.9),
  GIANT: moderateScale(BASE_FONT_SIZES.GIANT, 0.9),
} as const;
