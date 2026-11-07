import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export const scaleForTheme = (value: number, scale: number): number => moderateScale(value * scale, 0.9);

export const vScaleForTheme = (value: number, scale: number): number => moderateVerticalScale(value * scale, 0.9);
