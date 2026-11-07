import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const Card = styled.View`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  padding: ${moderateVerticalScale(16, 0.9)}px ${moderateScale(16, 0.9)}px;
  border-radius: ${({ theme }) => moderateScale(theme.bento.radius, 0.9)}px;
  background-color: ${({ theme }) => theme.bento.surface};
  border-width: ${moderateScale(1, 0.9)}px;
  border-color: ${({ theme }) => theme.bento.border};
`;

const Kicker = styled.Text`
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(12, 0.9)}px;
  letter-spacing: ${moderateScale(0.6, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const Title = styled.Text`
  margin-top: ${moderateVerticalScale(6, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontTitle};
  font-size: ${moderateScale(20, 0.9)}px;
  color: ${({ theme }) => theme.bento.textPrimary};
`;

const Reward = styled.Text`
  margin-top: ${moderateVerticalScale(4, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(15, 0.9)}px;
  color: ${({ theme }) => theme.bento.accent};
`;

const ProgressLabel = styled.Text`
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  margin-bottom: ${moderateVerticalScale(8, 0.9)}px;
  font-family: ${({ theme }) => theme.bento.fontBody};
  font-size: ${moderateScale(13, 0.9)}px;
  color: ${({ theme }) => theme.bento.textSecondary};
`;

const Track = styled.View`
  height: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  overflow: hidden;
  flex-direction: row;
  background-color: ${({ theme }) => theme.bento.surfaceSecondary};
`;

const Fill = styled(Animated.View)<{ $danger?: boolean }>`
  height: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${moderateScale(999, 0.9)}px;
  background-color: ${({ $danger, theme }) => ($danger ? theme.bento.danger : theme.bento.accent)};
`;

const Segments = styled.View`
  flex-direction: row;
  gap: ${moderateScale(3, 0.9)}px;
`;

const Segment = styled.View<{ $filled: boolean }>`
  flex: 1;
  height: ${moderateVerticalScale(8, 0.9)}px;
  border-radius: ${moderateScale(4, 0.9)}px;
  background-color: ${({ $filled, theme }) => ($filled ? theme.bento.accent : theme.bento.surfaceSecondary)};
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: ${moderateVerticalScale(12, 0.9)}px;
  gap: ${moderateScale(8, 0.9)}px;
`;

const Action = styled.View`
  flex: 1;
`;

export const ChallengeRewardCardStyles = {
  Card,
  Kicker,
  Title,
  Reward,
  ProgressLabel,
  Track,
  Fill,
  Segments,
  Segment,
  Actions,
  Action,
};
