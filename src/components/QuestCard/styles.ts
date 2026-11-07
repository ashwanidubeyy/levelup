import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { BORDER } from '../../theme/spacing';
import type { ThemePanelFrame } from '../../theme/types';
import { mutedText, rowBetween } from '../../utils/commonStyles';
import { scaleForTheme, themeSpace, themeVSpace } from '../../theme/layoutScale';

const THUMB = moderateScale(56, 0.9);

const Container = styled.View<{ $accent: string; $frame: ThemePanelFrame }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => themeVSpace(theme, 'SM')}px;
  padding: ${({ theme }) => themeVSpace(theme, 'SM')}px ${({ theme }) => themeSpace(theme, 'SM')}px;
  background-color: ${({ theme, $frame }) => ($frame === 'flag' ? theme.colors.PANEL_ALT : theme.colors.PANEL)};
  border-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
  border-width: ${({ $frame }) => ($frame === 'rounded' ? BORDER.THICK : $frame === 'minimal' ? BORDER.HAIRLINE : 0)}px;
  border-color: ${({ $accent, $frame, theme }) =>
    $frame === 'rounded' ? $accent : $frame === 'minimal' ? theme.colors.PANEL_BORDER : theme.colors.TRANSPARENT};
  border-left-width: ${({ $frame }) =>
    $frame === 'corners' || $frame === 'flag' || $frame === 'stripe' ? BORDER.THICK : 0}px;
  border-left-color: ${({ $accent }) => $accent};
  border-top-width: ${({ $frame }) => ($frame === 'stripe' ? BORDER.THICK : 0)}px;
  border-top-color: ${({ $accent, $frame }) => ($frame === 'stripe' ? $accent : 'transparent')};
`;

const Thumb = styled.Image<{ $dim: boolean }>`
  width: ${THUMB}px;
  height: ${THUMB}px;
  border-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
  opacity: ${({ $dim }) => ($dim ? 0.4 : 1)};
`;

const Body = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => themeSpace(theme, 'SM')}px;
`;

const Title = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Description = styled.Text`
  ${mutedText}
  margin-top: ${({ theme }) => themeVSpace(theme, 'XS')}px;
`;

const Footer = styled.View`
  ${rowBetween}
  margin-top: ${({ theme }) => themeVSpace(theme, 'SM')}px;
`;

const Xp = styled.Text<{ $negative: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ $negative, theme }) => ($negative ? theme.colors.RED_BRIGHT : theme.colors.GOLD)};
`;

export const QuestCardStyles = {
  Container,
  Thumb,
  Body,
  Title,
  Description,
  Footer,
  Xp,
};
