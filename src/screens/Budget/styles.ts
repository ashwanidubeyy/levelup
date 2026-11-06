import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const Block = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const Summary = styled.Text<{ $danger: boolean }>`
  margin-top: ${V_SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ $danger }) => ($danger ? COLORS.RED_BRIGHT : COLORS.YELLOW)};
`;

const Row = styled.View`
  ${rowBetween}
  margin-top: ${V_SPACING.MD}px;
  padding-bottom: ${V_SPACING.SM}px;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${COLORS.PANEL_BORDER};
`;

const Note = styled.Text`
  flex: 1;
  margin-right: ${SPACING.SM}px;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.SM}px;
  color: ${COLORS.TEXT};
`;

const Amount = styled.Text`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${COLORS.WHITE};
`;

const Empty = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
`;

const Status = styled.View`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.SM}px ${SPACING.MD}px;
  border-radius: ${RADIUS.MD}px;
  background-color: ${COLORS.PANEL_ALT};
`;

export const BudgetStyles = { Block, Summary, Row, Note, Amount, Empty, Status };
