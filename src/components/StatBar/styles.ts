import styled from 'styled-components/native';
import { moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { RADIUS } from '../../theme/spacing';
import type { PanelVariant } from '../../types';
import { accentFor } from '../../utils/variant';

const HEIGHT = moderateVerticalScale(10, 0.9);
const THIN_HEIGHT = moderateVerticalScale(5, 0.9);

const Track = styled.View<{ $thin: boolean }>`
  flex-direction: row;
  height: ${({ $thin }) => ($thin ? THIN_HEIGHT : HEIGHT)}px;
  border-radius: ${RADIUS.PILL}px;
  background-color: ${COLORS.PANEL_BORDER};
  overflow: hidden;
`;

const Fill = styled.View<{ $flex: number; $variant: PanelVariant }>`
  flex: ${({ $flex }) => $flex};
  background-color: ${({ $variant }) => accentFor($variant)};
  border-radius: ${RADIUS.PILL}px;
`;

const Rest = styled.View<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
`;

export const StatBarStyles = {
  Track,
  Fill,
  Rest,
};
