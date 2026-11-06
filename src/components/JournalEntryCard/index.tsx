import React from 'react';
import type { JournalEntryCardProps } from '../../types';
import { JournalEntryCardStyles } from './styles';
import { JOURNAL_CONSTANTS } from '../../constants/journal';

const JournalEntryCard = ({ title, preview, dateLabel, moodLabel, moodColor, onPress }: JournalEntryCardProps) => (
  <JournalEntryCardStyles.Touchable activeOpacity={0.8} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
    <JournalEntryCardStyles.Header>
      <JournalEntryCardStyles.DateLabel>{dateLabel?.toUpperCase()}</JournalEntryCardStyles.DateLabel>
      <JournalEntryCardStyles.Mood>
        <JournalEntryCardStyles.MoodDot $color={moodColor} />
        <JournalEntryCardStyles.MoodLabel>{moodLabel}</JournalEntryCardStyles.MoodLabel>
      </JournalEntryCardStyles.Mood>
    </JournalEntryCardStyles.Header>
    <JournalEntryCardStyles.Title numberOfLines={1}>{title}</JournalEntryCardStyles.Title>
    <JournalEntryCardStyles.Preview numberOfLines={JOURNAL_CONSTANTS.PREVIEW_LINES}>{preview}</JournalEntryCardStyles.Preview>
  </JournalEntryCardStyles.Touchable>
);

export default JournalEntryCard;
