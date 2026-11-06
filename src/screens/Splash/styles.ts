import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const GIF_SIZE = moderateScale(240, 0.9);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.BLACK};
`;

const Gif = styled.Image`
  width: ${GIF_SIZE}px;
  height: ${GIF_SIZE}px;
`;

const Title = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  font-family: ${FONTS.DISPLAY_BLACK};
  font-size: ${FONT_SIZES.XXL}px;
  letter-spacing: ${SPACING.SM}px;
  color: ${COLORS.WHITE};
  text-shadow-color: ${COLORS.BLUE_GLOW};
  text-shadow-radius: ${SPACING.MD}px;
`;

const Tagline = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${FONTS.DISPLAY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  letter-spacing: ${SPACING.XS}px;
  color: ${COLORS.RED_BRIGHT};
`;

export const SplashStyles = {
  Container,
  Gif,
  Title,
  Tagline,
};
