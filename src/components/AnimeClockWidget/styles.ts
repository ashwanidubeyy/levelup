import { Animated } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Stack = styled.View``;

const Card = styled.View`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  min-height: ${moderateVerticalScale(148, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  shadow-color: ${({ theme }) => theme.colors.BLACK};
  shadow-offset: 0px ${moderateVerticalScale(8, 0.9)}px;
  shadow-opacity: ${({ theme }) => (theme.colorScheme === 'light' ? 0.08 : 0.22)};
  shadow-radius: ${moderateScale(16, 0.9)}px;
  elevation: 4;
`;

const Art = styled(Animated.Image)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Shade = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Body = styled.View`
  padding: ${moderateVerticalScale(16, 0.9)}px ${moderateScale(16, 0.9)}px;
`;

const TagRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Dot = styled(Animated.View)`
  width: ${moderateScale(8, 0.9)}px;
  height: ${moderateScale(8, 0.9)}px;
  border-radius: ${moderateScale(4, 0.9)}px;
  margin-right: ${moderateScale(8, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.accent};
`;

const Tag = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(11, 0.9)}px;
  letter-spacing: ${moderateScale(1.2, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const TimeRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: ${moderateVerticalScale(10, 0.9)}px;
`;

const Time = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(38, 0.9)}px;
  line-height: ${moderateScale(42, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Seconds = styled.Text`
  margin-left: ${moderateScale(4, 0.9)}px;
  margin-bottom: ${moderateVerticalScale(6, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(16, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const ModeRow = styled.View`
  flex-direction: row;
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
`;

const Mode = styled.TouchableOpacity<{ $active: boolean }>`
  margin-right: ${moderateScale(8, 0.9)}px;
  padding: ${moderateVerticalScale(4, 0.9)}px ${moderateScale(10, 0.9)}px;
  border-radius: ${moderateScale(12, 0.9)}px;
  background-color: ${({ $active, theme }) => ($active ? theme.bento.accentMuted : theme.colors.TRANSPARENT)};
`;

const ModeLabel = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ $active, theme }) => ($active ? theme.bento.textPrimary : theme.bento.textSecondary)};
`;

const Face = styled.View`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  align-items: flex-start;
`;

const DateLabel = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  letter-spacing: ${moderateScale(0.8, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

export const AnimeClockWidgetStyles = {
  Stack,
  Card,
  Art,
  Shade,
  Body,
  TagRow,
  Dot,
  Tag,
  TimeRow,
  Time,
  Seconds,
  ModeRow,
  Mode,
  ModeLabel,
  Face,
  DateLabel,
};
