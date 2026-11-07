import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${V_SPACING.SM}px 0;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${({ theme }) => theme.colors.PANEL};
`;

const Label = styled.Text`
  ${mutedText}
  flex: 1;
  margin-right: ${SPACING.MD}px;
`;

const Value = styled.Text<{ $color: string }>`
  flex: 1;
  text-align: right;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ $color }) => $color};
`;

export const InfoRowStyles = {
  Container,
  Label,
  Value,
};
