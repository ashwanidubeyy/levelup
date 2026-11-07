import styled from 'styled-components/native';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { COLORS } from '../../theme/colors';
import { V_SPACING } from '../../theme/spacing';

const Xp = styled.Text`
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const LevelCardStyles = { Xp };
