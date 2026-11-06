import styled from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, SPACING, V_SPACING } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import { accentFor } from '../../utils/variant';
import { mutedText } from '../../utils/commonStyles';

const TILE_WIDTH = moderateScale(150, 0.9);

const Tile = styled.TouchableOpacity`
  width: ${TILE_WIDTH}px;
  margin-bottom: ${V_SPACING.MD}px;
  padding: ${V_SPACING.MD}px ${SPACING.MD}px;
  background-color: ${COLORS.PANEL};
  border-radius: ${RADIUS.MD}px;
  border-width: ${BORDER.HAIRLINE}px;
  border-color: ${COLORS.PANEL_BORDER};
`;

const Value = styled.Text<{ $accent: PanelVariant }>`
  font-family: ${FONTS.DISPLAY_BOLD};
  font-size: ${FONT_SIZES.LG}px;
  color: ${({ $accent }) => accentFor($accent)};
`;

const Label = styled.Text`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${FONTS.BODY_SEMIBOLD};
  font-size: ${FONT_SIZES.SM}px;
  color: ${COLORS.TEXT};
`;

const Hint = styled.Text`
  ${mutedText}
  margin-top: ${V_SPACING.XS}px;
`;

export const HubTileStyles = { Tile, Value, Label, Hint };
