import styled from 'styled-components/native';
import {themeFontSize} from '../../theme/typography';
import { COLORS } from '../../theme/colors';
import { V_SPACING } from '../../theme/spacing';

const Xp = styled.Text`
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const LevelCardStyles = { Xp };
