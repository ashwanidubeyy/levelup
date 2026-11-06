import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { COLORS } from '../../theme/colors';
import { FONTS, FONT_SIZES } from '../../theme/typography';
import { BORDER, RADIUS, V_SPACING } from '../../theme/spacing';

const CHART_HEIGHT = moderateVerticalScale(140, 0.9);
const LABEL_HEIGHT = moderateVerticalScale(16, 0.9);
const BAR_GAP = moderateScale(2, 0.9);

const Container = styled.View`
  margin-top: ${V_SPACING.SM}px;
`;

const Plot = styled.View`
  height: ${CHART_HEIGHT}px;
  flex-direction: row;
  align-items: flex-end;
  border-bottom-width: ${BORDER.HAIRLINE}px;
  border-bottom-color: ${COLORS.PANEL_BORDER};
`;

const Column = styled.View`
  flex: 1;
  height: ${CHART_HEIGHT}px;
  padding-left: ${BAR_GAP / 2}px;
  padding-right: ${BAR_GAP / 2}px;
`;

const Spacer = styled.View<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
`;

const Bar = styled.View<{ $flex: number; $color: string }>`
  flex: ${({ $flex }) => $flex};
  background-color: ${({ $color }) => $color};
  border-top-left-radius: ${RADIUS.SM / 2}px;
  border-top-right-radius: ${RADIUS.SM / 2}px;
`;

const LimitLine = styled.View<{ $bottom: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ $bottom }) => $bottom}px;
  height: ${BORDER.HAIRLINE}px;
  background-color: ${COLORS.RED_BRIGHT};
  opacity: 0.7;
`;

const Labels = styled.View`
  flex-direction: row;
  height: ${LABEL_HEIGHT}px;
  margin-top: ${V_SPACING.XS}px;
`;

const LabelSlot = styled.View`
  flex: 1;
  align-items: center;
`;

const Label = styled.Text`
  position: absolute;
  top: 0;
  font-family: ${FONTS.BODY_MEDIUM};
  font-size: ${FONT_SIZES.XXS}px;
  color: ${COLORS.TEXT_DIM};
`;

export const BarChartStyles = {
  CHART_HEIGHT,
  Container,
  Plot,
  Column,
  Spacer,
  Bar,
  LimitLine,
  Labels,
  LabelSlot,
  Label,
};
