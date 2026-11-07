import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const DOT = moderateScale(8, 0.9);

const Touchable = styled.TouchableOpacity`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.LG}px ${SPACING.LG}px ${V_SPACING.LG}px ${SPACING.XL}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-radius: ${RADIUS.SM}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
  border-left-width: ${moderateScale(3, 0.9)}px;
  border-left-color: ${({ theme }) => theme.bento.accent};
`;

const Header = styled.View`
  ${rowBetween}
`;

const DateLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${({ theme }) => theme.colors.BLUE_LIGHT};
`;

const Mood = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MoodDot = styled.View<{ $color: string }>`
  width: ${DOT}px;
  height: ${DOT}px;
  border-radius: ${DOT / 2}px;
  background-color: ${({ $color }) => $color};
  margin-right: ${SPACING.XS}px;
`;

const MoodLabel = styled.Text`
  ${mutedText}
`;

const Title = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'LG')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Preview = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'SM') * 1.35}px;
`;

export const JournalEntryCardStyles = {
  Touchable,
  Header,
  DateLabel,
  Mood,
  MoodDot,
  MoodLabel,
  Title,
  Preview,
};
