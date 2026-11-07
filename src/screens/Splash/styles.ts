import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import {themeFontSize} from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const GIF_SIZE = moderateScale(240, 0.9);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.BLACK};
`;

const Gif = styled.Image`
  width: ${GIF_SIZE}px;
  height: ${GIF_SIZE}px;
`;

const Title = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BLACK};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXL')}px;
  letter-spacing: ${SPACING.SM}px;
  color: ${({ theme }) => theme.colors.WHITE};
  text-shadow-color: ${({ theme }) => theme.colors.BLUE_GLOW};
  text-shadow-radius: ${SPACING.MD}px;
`;

const Tagline = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XS}px;
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
`;

export const SplashStyles = {
  Container,
  Gif,
  Title,
  Tagline,
};
