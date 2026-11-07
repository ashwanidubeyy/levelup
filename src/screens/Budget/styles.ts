import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const Block = styled.View`
  margin-top: ${V_SPACING.MD}px;
`;

const Summary = styled.Text<{ $danger: boolean }>`
  margin-top: ${V_SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.RED_BRIGHT : theme.colors.YELLOW)};
`;

const ExpenseBlock = styled.View`
  margin-top: ${V_SPACING.MD}px;
  padding-bottom: ${V_SPACING.SM}px;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Row = styled.View`
  ${rowBetween}
  align-items: flex-start;
`;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${SPACING.XS}px;
  margin-top: ${V_SPACING.SM}px;
  justify-content: flex-end;
`;

const Note = styled.Text`
  flex: 1;
  margin-right: ${SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Amount = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const Empty = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
`;

const Status = styled.View`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.SM}px ${SPACING.MD}px;
  border-radius: ${RADIUS.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL_ALT};
`;

const CategoryWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${SPACING.XS}px;
  margin-top: ${V_SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
`;

const CategoryChip = styled.TouchableOpacity<{ $active: boolean }>`
  padding: ${V_SPACING.XS}px ${SPACING.SM}px;
  border-radius: ${RADIUS.SM}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ $active, theme }) => ($active ? theme.colors.YELLOW : theme.colors.PANEL_BORDER)};
  background-color: ${({ $active, theme }) => ($active ? theme.colors.PANEL_ALT : theme.colors.PANEL)};
`;

const CategoryLabel = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.YELLOW : theme.colors.TEXT_DIM)};
`;

const CategoryMeta = styled.Text`
  ${mutedText}
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  margin-top: ${V_SPACING.XS}px;
`;

export const BudgetStyles = {
  Block,
  Summary,
  ExpenseBlock,
  Row,
  Actions,
  Note,
  Amount,
  Empty,
  Status,
  CategoryWrap,
  CategoryChip,
  CategoryLabel,
  CategoryMeta,
};
