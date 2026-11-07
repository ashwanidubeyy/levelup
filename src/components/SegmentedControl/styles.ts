import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';

const HEIGHT = moderateVerticalScale(40, 0.9);

const Container = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.LG}px;
  padding: ${SPACING.XXS}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Segment = styled.TouchableOpacity<{ $active: boolean }>`
  flex: 1;
  height: ${HEIGHT}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RADIUS.SM}px;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.BLUE_DEEP : theme.colors.TRANSPARENT)};
`;

const Label = styled.Text<{ $active: boolean }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.WHITE : theme.colors.TEXT_MUTED)};
`;

export const SegmentedControlStyles = {
  Container,
  Segment,
  Label,
};
