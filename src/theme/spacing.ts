import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export const SPACING = {
  XXS: moderateScale(2, 0.9),
  XS: moderateScale(4, 0.9),
  SM: moderateScale(8, 0.9),
  MD: moderateScale(12, 0.9),
  LG: moderateScale(16, 0.9),
  XL: moderateScale(20, 0.9),
  XXL: moderateScale(28, 0.9),
  HUGE: moderateScale(40, 0.9),
} as const;

export const V_SPACING = {
  XS: moderateVerticalScale(4, 0.9),
  SM: moderateVerticalScale(8, 0.9),
  MD: moderateVerticalScale(12, 0.9),
  LG: moderateVerticalScale(16, 0.9),
  XL: moderateVerticalScale(24, 0.9),
  XXL: moderateVerticalScale(36, 0.9),
  TAB_BAR: moderateVerticalScale(64, 0.9),
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
