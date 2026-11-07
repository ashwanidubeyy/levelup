import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { bodyText, mutedText, rowBetween } from '../../utils/commonStyles';

const Container = styled.View`
  margin-bottom: ${V_SPACING.MD}px;
`;

const Header = styled.View`
  ${rowBetween}
  margin-bottom: ${V_SPACING.XS}px;
`;

const Label = styled.Text`
  ${bodyText}
`;

const Count = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Caption = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

export const AppCountRowStyles = {
  Container,
  Header,
  Label,
  Count,
  Caption,
};
