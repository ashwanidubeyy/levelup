import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';
import { mutedText } from '../../utils/commonStyles';

const HIT = moderateScale(40, 0.9);

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${V_SPACING.SM}px;
`;

const BackButton = styled.TouchableOpacity`
  width: ${HIT}px;
  height: ${HIT}px;
  align-items: center;
  justify-content: center;
  margin-left: -${SPACING.SM}px;
  margin-right: ${SPACING.XS}px;
`;

const Texts = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${FONT_SIZES.XL}px;
  letter-spacing: ${SPACING.XXS}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Subtitle = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS / 2}px;
`;

const RightButton = styled.TouchableOpacity`
  padding: ${V_SPACING.SM}px ${SPACING.SM}px;
`;

const RightLabel = styled.Text`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.XS}px;
  letter-spacing: ${SPACING.XXS / 2}px;
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
`;

export const ScreenHeaderStyles = {
  Container,
  BackButton,
  Texts,
  Title,
  Subtitle,
  RightButton,
  RightLabel,
};
