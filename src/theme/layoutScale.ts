import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import type { AppTheme } from './types';
import { SPACING, V_SPACING } from './spacing';

export const scaleForTheme = (value: number, scale: number): number => moderateScale(value * scale, 0.9);

export const vScaleForTheme = (value: number, scale: number): number => moderateVerticalScale(value * scale, 0.9);

const spacingScaleFor = (theme: AppTheme): number => theme?.layout?.spacingScale ?? 1;

export const themeSpace = (theme: AppTheme, key: keyof typeof SPACING): number =>
  SPACING[key] * spacingScaleFor(theme);

export const themeVSpace = (theme: AppTheme, key: keyof typeof V_SPACING): number =>
  V_SPACING[key] * spacingScaleFor(theme);
