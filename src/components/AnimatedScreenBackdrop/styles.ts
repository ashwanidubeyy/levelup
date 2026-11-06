import styled from 'styled-components/native';
import { Animated, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

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
  width: ${moderateScale(420, 0.9)}px;
  height: ${moderateScale(420, 0.9)}px;
  border-radius: ${moderateScale(210, 0.9)}px;
  background-color: ${COLORS.BLUE_TINT};
`;

const AuraAlt = styled(Animated.View)`
  position: absolute;
  width: ${moderateScale(340, 0.9)}px;
  height: ${moderateScale(340, 0.9)}px;
  border-radius: ${moderateScale(170, 0.9)}px;
  background-color: ${COLORS.VIOLET_TINT};
`;

const LeftImage = styled(Animated.Image)`
  position: absolute;
  width: ${moderateScale(220, 0.9)}px;
  height: ${moderateScale(300, 0.9)}px;
  top: ${moderateScale(8, 0.9)}px;
  left: ${SPACING.LG}px;
  opacity: 0.38;
`;

const RightImage = styled(Animated.Image)`
  position: absolute;
  width: ${moderateScale(240, 0.9)}px;
  height: ${moderateScale(320, 0.9)}px;
  bottom: ${moderateScale(40, 0.9)}px;
  right: ${SPACING.SM}px;
  opacity: 0.32;
`;

const Shimmer = styled(Animated.View)`
  position: absolute;
  left: -30%;
  top: 0;
  width: 45%;
  bottom: 0;
  background-color: ${COLORS.SCRIM_TOP};
`;

export const AnimatedScreenBackdropStyles = {
  Root,
  Aura,
  AuraAlt,
  LeftImage,
  RightImage,
  Shimmer,
};
