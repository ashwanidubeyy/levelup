import React from 'react';
import type { JournalEntryCardProps } from '../../types';
import { JournalEntryCardStyles } from './styles';
import { JOURNAL_CONSTANTS } from '../../constants/journal';

const JournalEntryCard = ({ dateLabel, opening, preview, onPress }: JournalEntryCardProps) => (
  <JournalEntryCardStyles.Touchable
    activeOpacity={0.8}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={dateLabel}
  >
    <JournalEntryCardStyles.DateLabel>{dateLabel}</JournalEntryCardStyles.DateLabel>
    {opening ? <JournalEntryCardStyles.Title numberOfLines={2}>{opening}</JournalEntryCardStyles.Title> : null}
    <JournalEntryCardStyles.Preview numberOfLines={JOURNAL_CONSTANTS.PREVIEW_LINES}>{preview}</JournalEntryCardStyles.Preview>
  </JournalEntryCardStyles.Touchable>
);

export default JournalEntryCard;
