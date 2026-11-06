import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, SPACING, V_SPACING } from '../../theme/spacing';

const INDICATOR_HEIGHT = moderateVerticalScale(3, 0.9);

const Container = styled.View<{ $bottom: number }>`
  flex-direction: row;
  height: ${({ $bottom }) => V_SPACING.TAB_BAR + $bottom}px;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  background-color: ${COLORS.BACKGROUND_ELEVATED};
  border-top-width: ${BORDER.HAIRLINE}px;
  border-top-color: ${COLORS.PANEL_BORDER};
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Indicator = styled.View<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: ${SPACING.LG}px;
  right: ${SPACING.LG}px;
  height: ${INDICATOR_HEIGHT}px;
  background-color: ${({ $active }) => ($active ? COLORS.BLUE_GLOW : COLORS.TRANSPARENT)};
`;

const Label = styled.Text<{ $color: string }>`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XXS * 0.9}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${({ $color }) => $color};
`;

export const TabBarStyles = {
  Container,
  Tab,
  Indicator,
  Label,
};
