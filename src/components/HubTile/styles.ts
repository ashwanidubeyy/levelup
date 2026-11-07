import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { themeFontSize } from '../../theme/typography';
import { BORDER } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import type { ThemePanelFrame } from '../../theme/types';
import { scaleForTheme, themeSpace, themeVSpace } from '../../theme/layoutScale';
import { mutedText } from '../../utils/commonStyles';

const TILE_WIDTH = (width: number, inset: number, gap: number) => (width - inset * 2 - gap) / 2;

const Tile = styled.TouchableOpacity<{ $frame: ThemePanelFrame }>`
  width: ${({ theme }) => TILE_WIDTH(Dimensions.get('window').width, scaleForTheme(theme.layout.contentInset, theme.layout.scale) * 2, themeSpace(theme, 'MD'))}px;
  padding: ${({ theme }) => themeVSpace(theme, 'SM')}px ${({ theme }) => themeSpace(theme, 'SM')}px;
  background-color: ${({ theme, $frame }) => ($frame === 'stripe' ? theme.colors.PANEL : theme.colors.PANEL_ALT)};
  border-radius: ${({ theme }) => scaleForTheme(theme.layout.panelRadius, theme.layout.scale)}px;
  border-width: ${({ $frame }) => ($frame === 'rounded' ? BORDER.THICK : BORDER.HAIRLINE)}px;
  border-color: ${({ theme, $frame }) => ($frame === 'rounded' ? theme.colors.BLUE_GLOW : theme.colors.PANEL_BORDER)};
  border-top-width: ${({ $frame }) => ($frame === 'stripe' ? BORDER.THICK : 0)}px;
  border-top-color: ${({ theme, $frame }) => ($frame === 'stripe' ? theme.colors.YELLOW : theme.colors.TRANSPARENT)};
  border-left-width: ${({ $frame }) => ($frame === 'flag' ? BORDER.THICK : 0)}px;
  border-left-color: ${({ theme, $frame }) => ($frame === 'flag' ? theme.colors.RED_BRIGHT : theme.colors.TRANSPARENT)};
`;

const Value = styled.Text<{ $accent: PanelVariant }>`
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_BOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'MD')}px;
  color: ${({ $accent, theme }) => theme.accents[$accent]};
`;

const Label = styled.Text`
  margin-top: ${({ theme }) => themeVSpace(theme, 'XS')}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Hint = styled.Text`
  ${mutedText}
  margin-top: ${({ theme }) => themeVSpace(theme, 'XS')}px;
`;

export const HubTileStyles = { Tile, Value, Label, Hint };
