import styled from 'styled-components/native';
import { themeFontSize } from '../../theme/typography';
import { V_SPACING } from '../../theme/spacing';

const Actions = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const HeroTitle = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  letter-spacing: ${({ theme }) => theme.typography.displayLetterSpacing}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

export const JournalStyles = {
  Actions,
  HeroTitle,
};
