import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import { accentFor } from '../../utils/variant';
import { mutedText } from '../../utils/commonStyles';

const Container = styled.View<{ $accent: PanelVariant }>`
  flex: 1;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-bottom-width: ${BORDER.THICK}px;
  border-bottom-color: ${({ $accent, theme }) => theme.accents[$accent]};
`;

const Value = styled.Text`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Label = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

export const StatTileStyles = {
  Container,
  Value,
  Label,
};
