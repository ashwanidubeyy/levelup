import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Greeting = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(28, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Subtitle = styled.Text`
  margin-top: ${moderateVerticalScale(2, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const StreakPill = styled.View`
  padding: ${moderateVerticalScale(6, 0.9)}px ${moderateScale(12, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.accentMuted};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const StreakText = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Card = styled.View`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  padding: ${moderateVerticalScale(16, 0.9)}px ${moderateScale(16, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(13, 0.9)}px;
  letter-spacing: ${moderateScale(0.8, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const CardValue = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(16, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Track = styled.View`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  height: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bento.surfaceSecondary};
`;

const Fill = styled(Animated.View)<{ $danger: boolean }>`
  height: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  background-color: ${({ $danger, theme }) => ($danger ? theme.bento.danger : theme.bento.accent)};
`;

const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
`;

const Meta = styled.Text`
  flex: 1;
  margin-right: ${moderateScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const Live = styled.Text<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ $active, theme }) => ($active ? theme.bento.accent : theme.bento.textSecondary)};
`;

const Snooze = styled.Pressable`
  padding: ${moderateVerticalScale(6, 0.9)}px ${moderateScale(12, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  background-color: ${({ theme }) => theme.bento.surfaceSecondary};
`;

const SnoozeLabel = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Note = styled.Text`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const NoteAction = styled.Text`
  margin-top: ${moderateVerticalScale(6, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const Body = styled.Text`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(15, 0.9)}px;
  line-height: ${moderateScale(21, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: stretch;
  gap: ${moderateScale(10, 0.9)}px;
  margin-top: ${moderateVerticalScale(10, 0.9)}px;
`;

const Cell = styled.View`
  flex: 1;
`;

const Tile = styled.View`
  flex: 1;
  min-height: ${moderateVerticalScale(108, 0.9)}px;
  padding: ${moderateVerticalScale(14, 0.9)}px ${moderateScale(12, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
  justify-content: space-between;
`;

const TileLabel = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const TileValue = styled.Text`
  margin-top: ${moderateVerticalScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(18, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const TileHint = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

export const HomeStyles = {
  TopBar,
  Greeting,
  Subtitle,
  StreakPill,
  StreakText,
  Card,
  CardHeader,
  CardTitle,
  CardValue,
  Track,
  Fill,
  MetaRow,
  Meta,
  Live,
  Snooze,
  SnoozeLabel,
  Note,
  NoteAction,
  Body,
  Row,
  Cell,
  Tile,
  TileLabel,
  TileValue,
  TileHint,
};
