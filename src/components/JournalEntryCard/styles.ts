import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText, rowBetween } from '../../utils/commonStyles';

const DOT = moderateScale(8, 0.9);

const Touchable = styled.TouchableOpacity`
  margin-top: ${V_SPACING.MD}px;
  padding: ${V_SPACING.MD}px ${SPACING.LG}px;
  background-color: ${COLORS.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${COLORS.PANEL_BORDER};
`;

const Header = styled.View`
  ${rowBetween}
`;

const DateLabel = styled.Text`
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${COLORS.BLUE_LIGHT};
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
  font-family: ${FONTS.BODY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${COLORS.TEXT};
`;

const Preview = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
  line-height: ${FONT_SIZES.SM * 1.35}px;
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
