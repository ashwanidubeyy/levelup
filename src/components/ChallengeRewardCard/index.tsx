import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import PrimaryButton from '../PrimaryButton';
import { ChallengeRewardCardStyles } from './styles';
import { clamp } from '../../utils/helpers';

interface Props {
  title: string;
  reward: string;
  progressLabel: string;
  progress: number;
  total: number;
  done: number;
  checkInLabel?: string;
  openLabel?: string;
  canCheckIn: boolean;
  onCheckIn?: () => void;
  onOpen?: () => void;
}

const SEGMENT_LIMIT = 28;

const ChallengeRewardCard = ({
  title,
  reward,
  progressLabel,
  progress,
  total,
  done,
  checkInLabel,
  openLabel,
  canCheckIn,
  onCheckIn,
  onOpen,
}: Props) => {
  const fill = useRef(new Animated.Value(0)).current;
  const segments = total > 0 && total <= SEGMENT_LIMIT;
  const indexes = segments ? Array.from({ length: total }, (_item: unknown, index: number) => index) : [];

  useEffect(() => {
    Animated.timing(fill, {
      toValue: clamp(progress, 0, 1),
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [fill, progress]);

  const width = fill.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <ChallengeRewardCardStyles.Card>
      <ChallengeRewardCardStyles.Title>{title}</ChallengeRewardCardStyles.Title>
      <ChallengeRewardCardStyles.Reward>{reward}</ChallengeRewardCardStyles.Reward>
      {progressLabel ? <ChallengeRewardCardStyles.ProgressLabel>{progressLabel}</ChallengeRewardCardStyles.ProgressLabel> : null}
      {total <= 0 ? null : segments ? (
        <ChallengeRewardCardStyles.Segments>
          {indexes.map((index: number) => (
            <ChallengeRewardCardStyles.Segment key={`day-${index + 1}`} $filled={index < done} />
          ))}
        </ChallengeRewardCardStyles.Segments>
      ) : (
        <ChallengeRewardCardStyles.Track>
          <ChallengeRewardCardStyles.Fill style={{ width }} />
        </ChallengeRewardCardStyles.Track>
      )}
      <ChallengeRewardCardStyles.Actions>
        {canCheckIn && onCheckIn && checkInLabel ? (
          <ChallengeRewardCardStyles.Action>
            <PrimaryButton label={checkInLabel} onPress={onCheckIn} compact />
          </ChallengeRewardCardStyles.Action>
        ) : null}
        {onOpen && openLabel ? (
          <ChallengeRewardCardStyles.Action>
            <PrimaryButton label={openLabel} onPress={onOpen} variant="ghost" compact />
          </ChallengeRewardCardStyles.Action>
        ) : null}
      </ChallengeRewardCardStyles.Actions>
    </ChallengeRewardCardStyles.Card>
  );
};

export default ChallengeRewardCard;
