import React from 'react';
import PrimaryButton from '../PrimaryButton';
import StatBar from '../StatBar';
import type { ChallengeCardProps } from '../../types';
import { ChallengeCardStyles } from './styles';

const ChallengeCard = ({
  title,
  rangeLabel,
  progressLabel,
  progress,
  xpLabel,
  checkInLabel,
  deleteLabel,
  doneLabel,
  canCheckIn,
  completed,
  onCheckIn,
  onDelete,
}: ChallengeCardProps) => (
  <ChallengeCardStyles.Card>
    <ChallengeCardStyles.Title>{title}</ChallengeCardStyles.Title>
    <ChallengeCardStyles.Meta>{rangeLabel}</ChallengeCardStyles.Meta>
    <StatBar progress={progress} variant={completed ? 'monarch' : 'system'} thin />
    <ChallengeCardStyles.Progress>{progressLabel}</ChallengeCardStyles.Progress>
    <ChallengeCardStyles.Meta>{xpLabel}</ChallengeCardStyles.Meta>
    <ChallengeCardStyles.Actions>
      <ChallengeCardStyles.ActionSlot>
        <PrimaryButton
          label={completed ? doneLabel : checkInLabel}
          onPress={onCheckIn}
          disabled={completed || !canCheckIn}
          compact
        />
      </ChallengeCardStyles.ActionSlot>
      <ChallengeCardStyles.ActionSlot>
        <PrimaryButton label={deleteLabel} onPress={onDelete} variant="danger" compact />
      </ChallengeCardStyles.ActionSlot>
    </ChallengeCardStyles.Actions>
  </ChallengeCardStyles.Card>
);

export default ChallengeCard;
