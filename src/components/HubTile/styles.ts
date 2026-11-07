import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import { accentFor } from '../../utils/variant';
import { mutedText } from '../../utils/commonStyles';

const COLUMN_GAP = SPACING.MD;
const TILE_WIDTH = (Dimensions.get('window').width - SPACING.LG * 2 - COLUMN_GAP) / 2;

const Tile = styled.TouchableOpacity`
  width: ${TILE_WIDTH}px;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Value = styled.Text<{ $accent: PanelVariant }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${({ $accent, theme }) => theme.accents[$accent]};
`;

const Label = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const Hint = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

export const HubTileStyles = { Tile, Value, Label, Hint };
