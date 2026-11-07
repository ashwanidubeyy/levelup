import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const Clock = styled.Text`
  margin-top: ${V_SPACING.MD}px;
  margin-bottom: ${V_SPACING.SM}px;
  text-align: center;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.GIANT}px;
  color: ${({ theme }) => theme.colors.YELLOW};
`;

const Hint = styled.Text`
  ${mutedText}
  text-align: center;
  margin-bottom: ${V_SPACING.LG}px;
`;

const Block = styled.View`
  margin-top: ${V_SPACING.LG}px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${V_SPACING.LG}px;
  gap: ${SPACING.SM}px;
`;

const Today = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  text-align: center;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

export const FocusStyles = { Clock, Hint, Block, Actions, Today };
