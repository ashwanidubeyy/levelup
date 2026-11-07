import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { themeFontSize } from '../../theme/typography';

const BAR_HEIGHT = moderateVerticalScale(58, 0.9);
const PILL = moderateScale(30, 0.9);

const Outer = styled.View<{ $bottom: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  padding-left: ${moderateScale(18, 0.9)}px;
  padding-right: ${moderateScale(18, 0.9)}px;
  align-items: center;
  pointer-events: box-none;
`;

const Bar = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: ${moderateScale(420, 0.9)}px;
  height: ${BAR_HEIGHT}px;
  border-radius: ${PILL}px;
  background-color: ${({ theme }) => theme.colors.GLASS_FILL};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.colors.GLASS_STROKE};
  ${Platform.select({
    ios: `
      shadow-color: #000000;
      shadow-opacity: 0.22;
      shadow-radius: ${moderateScale(18, 0.9)}px;
      shadow-offset: 0px ${moderateScale(8, 0.9)}px;
    `,
    android: `elevation: 12;`,
  })}
`;

const Tab = styled.TouchableOpacity<{ $active: boolean }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: ${BAR_HEIGHT}px;
`;

const ActivePill = styled.View<{ $accent: string; $visible: boolean }>`
  position: absolute;
  width: ${moderateScale(52, 0.9)}px;
  height: ${moderateScale(34, 0.9)}px;
  border-radius: ${moderateScale(17, 0.9)}px;
  background-color: ${({ $accent }) => $accent};
  opacity: ${({ $visible }) => ($visible ? 0.18 : 0)};
`;

const Label = styled.Text<{ $active: boolean }>`
  margin-top: ${moderateScale(3, 0.9)}px;
  font-family: ${({ theme }) => theme.typography.fonts.BODY_SEMIBOLD};
  font-size: ${({ theme }) => themeFontSize(theme, 'XXS')}px;
  color: ${({ $active, theme }) => ($active ? theme.colors.TEXT : theme.colors.TEXT_DIM)};
`;

export const TabBarStyles = {
  Outer,
  Bar,
  Tab,
  ActivePill,
  Label,
};
