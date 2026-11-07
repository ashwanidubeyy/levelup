import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { SPACING, V_SPACING } from '../../theme/spacing';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.BLACK};
`;

const Shade = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 46%;
  background-color: ${({ theme }) => theme.colors.BLACK};
  opacity: 0.72;
`;

const Footer = styled.View<{ $bottom: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  padding-left: ${SPACING.XL}px;
  padding-right: ${SPACING.XL}px;
  padding-bottom: ${({ $bottom }) => $bottom + V_SPACING.XXL}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BLACK};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXL')}px;
  letter-spacing: ${SPACING.SM}px;
  color: ${({ theme }) => theme.colors.WHITE};
  text-align: center;
`;

const Tagline = styled.Text`
  margin-top: ${V_SPACING.SM}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  letter-spacing: ${SPACING.XS}px;
  color: ${({ theme }) => theme.colors.RED_BRIGHT};
  text-align: center;
`;

const Loading = styled.Text`
  margin-top: ${V_SPACING.LG}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
  letter-spacing: ${moderateScale(0.8, 0.9)}px;
`;

export const SplashStyles = {
  Container,
  Shade,
  Footer,
  Title,
  Tagline,
  Loading,
};
