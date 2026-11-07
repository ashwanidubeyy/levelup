import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { scaleForTheme } from '../../theme/layoutScale';
import { mutedText } from '../../utils/commonStyles';

const Shortcuts = styled.View`
  flex-direction: row;
  gap: ${SPACING.MD}px;
  margin-top: ${V_SPACING.LG}px;
`;

const Hub = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => scaleForTheme(theme.layout.hubGap, theme.layout.scale)}px;
  margin-top: ${V_SPACING.LG}px;
`;

const AgendaRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${V_SPACING.SM}px 0;
`;

const AgendaTitle = styled.Text`
  flex: 1;
  margin-right: ${SPACING.SM}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const AgendaMeta = styled.Text`
  ${mutedText}
`;

const Empty = styled.Text`
  ${mutedText}
`;

const CountRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Count = styled.Text<{ $danger: boolean }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.GIANT}px;
  line-height: ${FONT_SIZES.GIANT * 1.05}px;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.RED_BRIGHT : theme.colors.WHITE)};
`;

const Limit = styled.Text`
  margin-left: ${SPACING.SM}px;
  margin-bottom: ${V_SPACING.SM}px;
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

const Message = styled.Text<{ $danger: boolean }>`
  margin-top: ${V_SPACING.SM}px;
  margin-bottom: ${V_SPACING.MD}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.MD}px;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.RED_BRIGHT : theme.colors.TEXT)};
`;

const DayHint = styled.Text`
  ${mutedText}
  margin-bottom: ${V_SPACING.SM}px;
`;

const Live = styled.Text<{ $active: boolean }>`
  ${mutedText}
  margin-top: ${V_SPACING.MD}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.BLUE_GLOW : theme.colors.TEXT_MUTED)};
`;

const Tiles = styled.View`
  flex-direction: row;
  margin-top: ${V_SPACING.LG}px;
  margin-bottom: ${V_SPACING.LG}px;
  gap: ${SPACING.MD}px;
`;

export const HomeStyles = {
  Shortcuts,
  Hub,
  AgendaRow,
  AgendaTitle,
  AgendaMeta,
  Empty,
  CountRow,
  Count,
  Limit,
  Message,
  DayHint,
  Live,
  Tiles,
};
