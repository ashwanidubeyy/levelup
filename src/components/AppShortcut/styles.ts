import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: ${V_SPACING.XXL}px;
  padding: ${V_SPACING.SM}px ${SPACING.XS}px;
  background-color: ${COLORS.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${COLORS.PANEL_BORDER};
`;

const Label = styled.Text`
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${COLORS.TEXT};
  text-align: center;
`;

export const AppShortcutStyles = { Button, Label };
