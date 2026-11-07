import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Title = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Body = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.SM}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'SM') * 1.4}px;
`;

export const ComingSoonCardStyles = {
  Title,
  Body,
};
