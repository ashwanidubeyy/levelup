import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';

const DOT = moderateScale(10, 0.9);

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${V_SPACING.SM}px;
`;

const Chip = styled.TouchableOpacity<{ $active: boolean; $color: string }>`
  flex-direction: row;
  align-items: center;
  margin-right: ${SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
  padding: ${V_SPACING.SM}px ${SPACING.MD}px;
  border-radius: ${RADIUS.PILL}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $active, $color, theme }) => ($active ? $color : theme.colors.PANEL_BORDER)};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.PANEL : theme.colors.PANEL_ALT)};
`;

const Dot = styled.View<{ $color: string }>`
  width: ${DOT}px;
  height: ${DOT}px;
  border-radius: ${DOT / 2}px;
  background-color: ${({ $color }) => $color};
  margin-right: ${SPACING.SM}px;
`;

const Label = styled.Text<{ $active: boolean }>`
  font-family: ${FONTS.BODY_BOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.TEXT : theme.colors.TEXT_MUTED)};
`;

export const MoodSelectorStyles = {
  Container,
  Chip,
  Dot,
  Label,
};
