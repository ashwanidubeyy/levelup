import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { themeSpace } from '../../theme/layoutScale';

const Root = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const Aura = styled(Animated.View)`
  position: absolute;
  width: ${moderateScale(360, 0.9)}px;
  height: ${moderateScale(360, 0.9)}px;
  border-radius: ${moderateScale(180, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.BLUE_TINT};
`;

const AuraAlt = styled(Animated.View)`
  position: absolute;
  width: ${moderateScale(300, 0.9)}px;
  height: ${moderateScale(300, 0.9)}px;
  border-radius: ${moderateScale(150, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.VIOLET_TINT};
`;

const LeftImage = styled(Animated.Image)`
  position: absolute;
  width: ${moderateScale(200, 0.9)}px;
  height: ${moderateScale(260, 0.9)}px;
  top: ${moderateScale(6, 0.9)}px;
  left: ${({ theme }) => themeSpace(theme, 'SM')}px;
  opacity: 0.34;
`;

const RightImage = styled(Animated.Image)`
  position: absolute;
  width: ${moderateScale(220, 0.9)}px;
  height: ${moderateScale(280, 0.9)}px;
  bottom: ${moderateScale(32, 0.9)}px;
  right: ${({ theme }) => themeSpace(theme, 'XS')}px;
  opacity: 0.28;
`;

const Shimmer = styled(Animated.View)`
  position: absolute;
  left: -30%;
  top: 0;
  width: 40%;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.SCRIM_TOP};
`;

const PatternDot = styled(Animated.View)`
  position: absolute;
  width: ${moderateScale(6, 0.9)}px;
  height: ${moderateScale(6, 0.9)}px;
  border-radius: ${moderateScale(3, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.YELLOW_TINT};
`;

const PatternBand = styled(Animated.View)`
  position: absolute;
  height: ${moderateScale(1, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.BLUE_TINT};
`;

export const AnimatedScreenBackdropStyles = {
  Root,
  Aura,
  AuraAlt,
  LeftImage,
  RightImage,
  Shimmer,
  PatternDot,
  PatternBand,
};
