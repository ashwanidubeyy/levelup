import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import { sectionTitleText } from '../../utils/commonStyles';

const THUMB = moderateScale(72, 0.9);

const Container = styled.TouchableOpacity`
  margin-top: ${V_SPACING.LG}px;
  flex-direction: row;
  align-items: center;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${COLORS.PANEL_ALT};
  border-left-width: ${BORDER.THICK}px;
  border-left-color: ${COLORS.RED_BRIGHT};
  border-radius: ${RADIUS.MD}px;
`;

const Thumb = styled.Image`
  width: ${THUMB}px;
  height: ${THUMB}px;
  border-radius: ${RADIUS.MD}px;
`;

const Placeholder = styled.View`
  width: ${THUMB}px;
  height: ${THUMB}px;
  border-radius: ${RADIUS.MD}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const Body = styled.View`
  flex: 1;
  margin-left: ${SPACING.MD}px;
`;

const Title = styled.Text`
  ${sectionTitleText}
  color: ${COLORS.RED_BRIGHT};
`;

const Quote = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.MD}px;
  line-height: ${FONT_SIZES.MD * 1.3}px;
  color: ${COLORS.TEXT};
`;

const Author = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${COLORS.TEXT_MUTED};
`;

const Hint = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  color: ${COLORS.TEXT_DIM};
`;

export const QuoteCardStyles = {
  Hint,
  Placeholder,
  Container,
  Thumb,
  Body,
  Title,
  Quote,
  Author,
};
