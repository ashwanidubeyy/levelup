import React from 'react';
import StatusChip from '../StatusChip';
import type { ChipVariant, QuestCardProps, QuestStatus } from '../../types';
import { QuestCardStyles } from './styles';
import { chipColorFor } from '../../utils/variant';

const STATUS_VARIANTS: Record<QuestStatus, ChipVariant> = {
  done: 'success',
  inProgress: 'info',
  failed: 'danger',
  locked: 'muted',
};

const QuestCard = ({
  title,
  description,
  xpLabel,
  statusLabel,
  status,
  image,
  negative = false,
}: QuestCardProps) => {
  const variant = STATUS_VARIANTS[status];

  return (
    <QuestCardStyles.Container $accent={chipColorFor(variant)}>
      <QuestCardStyles.Thumb source={image} resizeMode="cover" $dim={status === 'locked'} />
      <QuestCardStyles.Body>
        <QuestCardStyles.Title>{title}</QuestCardStyles.Title>
        <QuestCardStyles.Description>{description}</QuestCardStyles.Description>
        <QuestCardStyles.Footer>
          <QuestCardStyles.Xp $negative={negative}>{xpLabel}</QuestCardStyles.Xp>
          <StatusChip label={statusLabel} variant={variant} />
        </QuestCardStyles.Footer>
      </QuestCardStyles.Body>
    </QuestCardStyles.Container>
  );
};

export default QuestCard;
