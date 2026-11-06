import { moderateScale } from 'react-native-size-matters';

export const FONTS = {
  DISPLAY_BLACK: 'Orbitron-Black',
  DISPLAY_BOLD: 'Orbitron-Bold',
  DISPLAY_MEDIUM: 'Orbitron-Medium',
  BODY_REGULAR: 'Rajdhani-Regular',
  BODY_MEDIUM: 'Rajdhani-Medium',
  BODY_SEMIBOLD: 'Rajdhani-SemiBold',
  BODY_BOLD: 'Rajdhani-Bold',
} as const;

export const FONT_SIZES = {
  XXS: moderateScale(10, 0.9),
  XS: moderateScale(12, 0.9),
  SM: moderateScale(14, 0.9),
  MD: moderateScale(16, 0.9),
  LG: moderateScale(18, 0.9),
  XL: moderateScale(22, 0.9),
  XXL: moderateScale(28, 0.9),
  HUGE: moderateScale(44, 0.9),
  GIANT: moderateScale(64, 0.9),
} as const;
