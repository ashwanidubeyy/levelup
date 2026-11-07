import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';

const Container = styled.View<{ $color: string }>`
  align-self: flex-start;
  padding: ${V_SPACING.XS / 2}px ${SPACING.SM}px;
  border-radius: ${RADIUS.SM}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $color }) => $color};
  background-color: ${({ theme }) => theme.colors.PANEL};
`;

const Label = styled.Text<{ $color: string }>`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${({ $color }) => $color};
`;

export const StatusChipStyles = {
  Container,
  Label,
};
