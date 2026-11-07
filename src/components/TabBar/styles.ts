import { Animated, Platform } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';
import { hexToRgba } from '../../utils/color';

const BAR_HEIGHT = moderateVerticalScale(58, 0.9);
const FAB_SIZE = moderateScale(56, 0.9);
const FAN_STEP = moderateVerticalScale(66, 0.9);
const FAN_SPREAD = moderateScale(158, 0.9);

const Outer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: box-none;
  justify-content: flex-end;
`;

const Scrim = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => hexToRgba(theme.colors.BLACK, 0.4)};
`;

const Dock = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: box-none;
`;

const Bar = styled.View<{ $bottom: number }>`
  flex-direction: row;
  align-items: center;
  height: ${BAR_HEIGHT}px;
  margin-bottom: ${({ $bottom }) => $bottom}px;
  margin-left: ${moderateScale(16, 0.9)}px;
  margin-right: ${moderateScale(16, 0.9)}px;
  border-radius: ${moderateScale(28, 0.9)}px;
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  background-color: ${({ theme }) => theme.bento.surface};
  shadow-color: ${({ theme }) => theme.colors.BLACK};
  ${Platform.OS === 'ios'
    ? `
      shadow-opacity: 0.18;
      shadow-radius: ${moderateScale(12, 0.9)}px;
      shadow-offset: 0px ${moderateScale(6, 0.9)}px;
    `
    : 'elevation: 8;'}
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${BAR_HEIGHT}px;
`;

const Marker = styled.View<{ $visible: boolean }>`
  width: ${moderateScale(18, 0.9)}px;
  height: ${moderateScale(3, 0.9)}px;
  margin-bottom: ${moderateScale(4, 0.9)}px;
  border-radius: ${moderateScale(2, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.accent};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

const Label = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.TEXT : theme.colors.TEXT_DIM)};
`;

const Bubble = styled(Animated.View)<{ $bottom: number }>`
  position: absolute;
  right: ${moderateScale(18, 0.9)}px;
  bottom: ${({ $bottom }) => $bottom}px;
`;

const BubbleButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const BubbleLabel = styled.Text`
  margin-right: ${moderateScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(6, 0.9)}px ${moderateScale(10, 0.9)}px;
  border-radius: ${moderateScale(12, 0.9)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XS')}px;
  color: ${({ theme }) => theme.colors.TEXT};
`;

const BubbleIcon = styled.View<{ $active: boolean }>`
  width: ${moderateScale(48, 0.9)}px;
  height: ${moderateScale(48, 0.9)}px;
  border-radius: ${moderateScale(24, 0.9)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ $active, theme }) => ($active ? theme.bento.accent : theme.bento.surface)};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ $active, theme }) => ($active ? theme.bento.accent : theme.bento.border)};
`;

const FabSlot = styled(Animated.View)<{ $bottom: number }>`
  position: absolute;
  right: ${moderateScale(18, 0.9)}px;
  bottom: ${({ $bottom }) => $bottom}px;
`;

const Fab = styled.TouchableOpacity`
  width: ${FAB_SIZE}px;
  height: ${FAB_SIZE}px;
  border-radius: ${moderateScale(28, 0.9)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bento.accent};
  shadow-color: ${({ theme }) => theme.colors.BLACK};
  ${Platform.OS === 'ios'
    ? `
      shadow-opacity: 0.22;
      shadow-radius: ${moderateScale(10, 0.9)}px;
      shadow-offset: 0px ${moderateScale(4, 0.9)}px;
    `
    : 'elevation: 10;'}
`;

export const TAB_BAR_METRICS = {
  BAR_HEIGHT,
  FAB_SIZE,
  FAN_STEP,
  FAN_SPREAD,
};

export const TabBarStyles = {
  Outer,
  Scrim,
  Dock,
  Bar,
  Tab,
  Marker,
  Label,
  Bubble,
  BubbleButton,
  BubbleLabel,
  BubbleIcon,
  FabSlot,
  Fab,
};
