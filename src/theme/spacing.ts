import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export const SPACING = {
  XXS: moderateScale(2, 0.9),
  XS: moderateScale(3, 0.9),
  SM: moderateScale(6, 0.9),
  MD: moderateScale(10, 0.9),
  LG: moderateScale(13, 0.9),
  XL: moderateScale(16, 0.9),
  XXL: moderateScale(22, 0.9),
  HUGE: moderateScale(32, 0.9),
} as const;

export const V_SPACING = {
  XS: moderateVerticalScale(3, 0.9),
  SM: moderateVerticalScale(6, 0.9),
  MD: moderateVerticalScale(9, 0.9),
  LG: moderateVerticalScale(12, 0.9),
  XL: moderateVerticalScale(18, 0.9),
  XXL: moderateVerticalScale(28, 0.9),
  TAB_BAR: moderateVerticalScale(84, 0.9),
} as const;

export const RADIUS = {
  SM: moderateScale(4, 0.9),
  MD: moderateScale(8, 0.9),
  LG: moderateScale(14, 0.9),
  XL: moderateScale(22, 0.9),
  PILL: moderateScale(999, 0.9),
} as const;

export const BORDER = {
  HAIRLINE: moderateScale(1, 0.9),
  THICK: moderateScale(2, 0.9),
} as const;
