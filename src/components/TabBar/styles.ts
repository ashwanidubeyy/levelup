import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const BAR_HEIGHT = moderateVerticalScale(52, 0.9);
const HALO = moderateScale(40, 0.9);
const DOT = moderateScale(4, 0.9);

const Outer = styled.View<{ $bottom: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  padding-left: ${moderateScale(14, 0.9)}px;
  padding-right: ${moderateScale(14, 0.9)}px;
  align-items: center;
`;

const Bar = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: ${moderateScale(400, 0.9)}px;
  height: ${BAR_HEIGHT}px;
  border-radius: ${moderateScale(26, 0.9)}px;
  background-color: ${({ theme }) => theme.colors.PANEL};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.colors.PANEL_BORDER};
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${BAR_HEIGHT}px;
`;

const ActiveHalo = styled.View<{ $accent: string }>`
  position: absolute;
  width: ${HALO}px;
  height: ${HALO}px;
  border-radius: ${HALO / 2}px;
  background-color: ${({ $accent }) => $accent};
  opacity: 0.14;
`;

const Dot = styled.View<{ $accent: string }>`
  position: absolute;
  bottom: ${moderateScale(8, 0.9)}px;
  width: ${DOT}px;
  height: ${DOT}px;
  border-radius: ${DOT / 2}px;
  background-color: ${({ $accent }) => $accent};
`;

export const TabBarStyles = {
  Outer,
  Bar,
  Tab,
  ActiveHalo,
  Dot,
};
