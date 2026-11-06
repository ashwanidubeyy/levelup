import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { HeroSize } from '../../types';

const HEIGHTS: Record<HeroSize, number> = {
  tall: moderateVerticalScale(300, 0.9),
  medium: moderateVerticalScale(200, 0.9),
  short: moderateVerticalScale(130, 0.9),
};

const Container = styled.View<{ $size: HeroSize }>`
  height: ${({ $size }) => HEIGHTS[$size]}px;
  border-radius: ${RADIUS.LG}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${COLORS.PANEL_BORDER};
  overflow: hidden;
  background-color: ${COLORS.PANEL};
  justify-content: flex-end;
`;

const Backdrop = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.View`
  padding: ${V_SPACING.LG}px ${SPACING.LG}px;
`;

export const AnimeHeroCardStyles = {
  Container,
  Backdrop,
  Content,
};
