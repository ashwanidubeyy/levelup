import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { BORDER } from '../../theme/spacing';
import { scaleForTheme, themeSpace, themeVSpace } from '../../theme/layoutScale';
import type { PanelVariant } from '../../types';
import type { ThemePanelFrame } from '../../theme/types';

const CORNER = moderateScale(12, 0.9);
const FLAG_WIDTH = moderateScale(4, 0.9);
const STRIPE_HEIGHT = moderateScale(4, 0.9);

const Container = styled.View<{ $variant: PanelVariant; $frame: ThemePanelFrame }>`
  margin-top: ${({ theme }) => themeVSpace(theme, 'MD')}px;
  padding: ${({ theme }) => themeVSpace(theme, 'MD')}px ${({ theme }) => themeSpace(theme, 'MD')}px;
  background-color: ${({ $frame, theme }) =>
    $frame === 'stripe' ? theme.colors.PANEL : theme.colors.PANEL_ALT};
  border-width: ${({ $frame }) =>
    $frame === 'rounded' ? BORDER.THICK : $frame === 'minimal' || $frame === 'flag' ? BORDER.HAIRLINE : 0}px;
  border-color: ${({ $variant, $frame, theme }) =>
    $frame === 'rounded' ? theme.accents[$variant] : theme.colors.PANEL_BORDER};
  border-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
  overflow: hidden;
`;

const TopGlow = styled.View<{ $variant: PanelVariant; $frame: ThemePanelFrame }>`
  position: absolute;
  top: 0;
  left: ${({ $frame, theme }) => ($frame === 'stripe' ? 0 : themeSpace(theme, 'LG'))}px;
  right: ${({ $frame, theme }) => ($frame === 'stripe' ? 0 : themeSpace(theme, 'LG'))}px;
  height: ${({ $frame }) => ($frame === 'stripe' ? STRIPE_HEIGHT : BORDER.THICK)}px;
  background-color: ${({ $variant, theme }) => theme.accents[$variant]};
  opacity: ${({ $frame }) => ($frame === 'minimal' ? 0 : 1)};
`;

const FlagRail = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${FLAG_WIDTH}px;
  background-color: ${({ $variant, theme }) => theme.accents[$variant]};
`;

const CornerTopLeft = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CORNER}px;
  height: ${CORNER}px;
  border-top-width: ${BORDER.THICK}px;
  border-left-width: ${BORDER.THICK}px;
  border-color: ${({ $variant, theme }) => theme.accents[$variant]};
  border-top-left-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
`;

const CornerBottomRight = styled.View<{ $variant: PanelVariant }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${CORNER}px;
  height: ${CORNER}px;
  border-bottom-width: ${BORDER.THICK}px;
  border-right-width: ${BORDER.THICK}px;
  border-color: ${({ $variant, theme }) => theme.accents[$variant]};
  border-bottom-right-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => themeVSpace(theme, 'SM')}px;
`;

const Title = styled.Text<{ $variant: PanelVariant }>`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  letter-spacing: ${({ theme }) => theme.typography.displayLetterSpacing}px;
  color: ${({ $variant, theme }) => theme.accents[$variant]};
`;

const RightLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT_MUTED};
`;

export const SystemPanelStyles = {
  Container,
  TopGlow,
  FlagRail,
  CornerTopLeft,
  CornerBottomRight,
  Header,
  Title,
  RightLabel,
};
