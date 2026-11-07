import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, V_SPACING } from '../../theme/spacing';

const CELL = moderateScale(36, 0.9);

const Container = styled.View``;

const Weekdays = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${V_SPACING.SM}px;
`;

const Weekday = styled.Text`
  width: ${CELL}px;
  text-align: center;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.XS}px;
  color: ${({ theme }) => theme.colors.TEXT_DIM};
`;

const Week = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${V_SPACING.XS}px;
`;

const Cell = styled.TouchableOpacity<{ $selected: boolean; $today: boolean }>`
  width: ${CELL}px;
  height: ${CELL}px;
  align-items: center;
  justify-content: center;
  border-radius: ${RADIUS.PILL}px;
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.BLUE : theme.colors.TRANSPARENT)};
  border-width: ${({ $today, $selected }) => ($today && !$selected ? BORDER.HAIRLINE : 0)}px;
  border-color: ${({ theme }) => theme.colors.YELLOW};
`;

const Day = styled.Text<{ $selected: boolean }>`
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.WHITE : theme.colors.TEXT)};
`;

const Dot = styled.View`
  position: absolute;
  bottom: ${moderateScale(4, 0.9)}px;
  width: ${moderateScale(4, 0.9)}px;
  height: ${moderateScale(4, 0.9)}px;
  border-radius: ${RADIUS.PILL}px;
  background-color: ${({ theme }) => theme.colors.YELLOW};
`;

const Spacer = styled.View`
  width: ${CELL}px;
  height: ${CELL}px;
`;

export const MonthGridStyles = { Container, Weekdays, Weekday, Week, Cell, Day, Dot, Spacer };
