import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import {themeFontSize} from '../../theme/typography';
import { BORDER, SPACING, V_SPACING } from '../../theme/spacing';

const INDICATOR_HEIGHT = moderateVerticalScale(3, 0.9);
const PILL_INDICATOR_HEIGHT = moderateVerticalScale(4, 0.9);
const GLOW_INDICATOR_HEIGHT = moderateVerticalScale(5, 0.9);

const Container = styled.View<{ $bottom: number }>`
  flex-direction: row;
  height: ${({ $bottom }) => V_SPACING.TAB_BAR + $bottom}px;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  background-color: ${({ theme }) => theme.colors.BACKGROUND_ELEVATED};
  border-top-width: ${BORDER.HAIRLINE}px;
  border-top-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IndicatorLine = styled.View<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: ${SPACING.LG}px;
  right: ${SPACING.LG}px;
  height: ${INDICATOR_HEIGHT}px;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.YELLOW : theme.colors.TRANSPARENT)};
`;

const IndicatorPill = styled.View<{ $active: boolean }>`
  position: absolute;
  top: ${V_SPACING.XS}px;
  align-self: center;
  width: ${moderateScale(36, 0.9)}px;
  height: ${PILL_INDICATOR_HEIGHT}px;
  border-radius: ${moderateScale(8, 0.9)}px;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.YELLOW : theme.colors.TRANSPARENT)};
`;

const IndicatorGlow = styled.View<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: ${SPACING.MD}px;
  right: ${SPACING.MD}px;
  height: ${GLOW_INDICATOR_HEIGHT}px;
  border-bottom-left-radius: ${moderateScale(6, 0.9)}px;
  border-bottom-right-radius: ${moderateScale(6, 0.9)}px;
  background-color: ${({ $active, theme }) => ($active ? theme.colors.YELLOW : theme.colors.TRANSPARENT)};
  opacity: ${({ $active }) => ($active ? 0.95 : 0)};
`;

const Label = styled.Text<{ $color: string }>`
  margin-top: ${V_SPACING.XS}px;
  font-family: ${({ theme }) => theme.typography.fonts.DISPLAY_MEDIUM};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS') * 0.9}px;
  letter-spacing: ${({ theme }) => theme.layout.letterSpacing}px;
  color: ${({ $color }) => $color};
`;

export const TabBarStyles = {
  Container,
  Tab,
  IndicatorLine,
  IndicatorPill,
  IndicatorGlow,
  Label,
};
