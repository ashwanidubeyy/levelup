import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { scaleForTheme, themeSpace, themeVSpace } from '../../theme/layoutScale';

const CARD_HEIGHT = moderateVerticalScale(168, 0.9);

const Card = styled.View`
  margin-top: ${({ theme }) => themeVSpace(theme, 'SM')}px;
  height: ${CARD_HEIGHT}px;
  border-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.PANEL_ALT};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Art = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 58%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.BLACK};
  opacity: 0.42;
`;

const Body = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: ${({ theme }) => themeSpace(theme, 'MD')}px;
  padding-right: ${({ theme }) => themeSpace(theme, 'LG')}px;
`;

const Day = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
  letter-spacing: ${moderateScale(0.5, 0.9)}px;
`;

const Time = styled.Text`
  margin-top: ${({ theme }) => themeVSpace(theme, 'XS')}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BLACK};
  font-size: ${({ theme }) => themeFontSize(theme, 'GIANT')}px;
  line-height: ${({ theme }) => themeFontSize(theme, 'GIANT') * 1.02}px;
  color: ${({ theme }) => theme.colors.WHITE};
`;

const Seconds = styled.Text`
  margin-top: ${({ theme }) => themeVSpace(theme, 'XS')}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'LG')}px;
  color: ${({ theme }) => theme.colors.BLUE_GLOW};
`;

const Caption = styled.Text`
  margin-top: ${({ theme }) => themeVSpace(theme, 'SM')}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  color: ${({ theme }) => theme.colors.TEXT_DIM};
  letter-spacing: ${moderateScale(1.2, 0.9)}px;
`;

export const AnimeClockWidgetStyles = {
  Card,
  Art,
  Overlay,
  Body,
  Day,
  Time,
  Seconds,
  Caption,
};
