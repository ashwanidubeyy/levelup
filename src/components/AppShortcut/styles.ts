import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: ${V_SPACING.XXL}px;
  padding: ${V_SPACING.SM}px ${SPACING.XS}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Label = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
  text-align: center;
`;

export const AppShortcutStyles = { Button, Label };
