import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { SHELL_LAYOUT } from '../../constants/screens';

const Shell = styled.View`
  flex: 1;
`;

const Bar = styled.View<{ $top: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding-top: ${({ $top }) => $top}px;
  padding-left: ${moderateScale(16, 0.9)}px;
  padding-right: ${moderateScale(12, 0.9)}px;
  height: ${({ $top }) => $top + moderateVerticalScale(SHELL_LAYOUT.SWITCHER_BODY, 0.9)}px;
  flex-direction: row;
  align-items: center;
`;

const Chips = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Chip = styled.TouchableOpacity<{ $active: boolean }>`
  margin-right: ${moderateScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(6, 0.9)}px ${moderateScale(14, 0.9)}px;
  border-radius: ${moderateScale(16, 0.9)}px;
  background-color: ${({ $active, theme }) => ($active ? theme.bento.accentMuted : theme.colors.TRANSPARENT)};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ $active, theme }) => ($active ? theme.bento.accent : theme.colors.GLASS_STROKE)};
`;

const ChipLabel = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'SM')}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.TEXT : theme.colors.TEXT_MUTED)};
`;

const Gear = styled.View`
  width: ${moderateScale(36, 0.9)}px;
  height: ${moderateScale(36, 0.9)}px;
  align-items: center;
  justify-content: center;
`;

export const ModeSwitcherStyles = {
  Shell,
  Bar,
  Chips,
  Chip,
  ChipLabel,
  Gear,
};
