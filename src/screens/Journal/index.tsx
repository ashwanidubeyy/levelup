import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import JournalEntryCard from '../../components/JournalEntryCard';
import EmptyState from '../../components/EmptyState';
import { JournalStyles } from './styles';
import type { JournalEntry } from '../../types';
import { JOURNAL_CONSTANTS } from '../../constants/journal';
import { COMMON_CONSTANTS } from '../../constants/common';
import { SCREEN_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../store';
import { formatDateTime } from '../../utils/date';
import { previewText } from '../../utils/helpers';

type Props = TabScreenProps<'JournalHub'> & {
  embedded?: boolean;
};

const PREVIEW_LENGTH = 180;

const Journal = ({ navigation, embedded = false }: Props) => {
  const { t } = useTranslation();
  const entries = useAppSelector(state => state?.journal?.entries) ?? [];

  const moods = useMemo(() => {
    const map: Record<string, { label: string; color: string }> = {};
    JOURNAL_CONSTANTS.MOOD_OPTIONS.forEach((mood: (typeof JOURNAL_CONSTANTS.MOOD_OPTIONS)[number]) => {
      map[mood.value] = { label: t(mood.labelKey), color: mood.color };
    });
    return map;
  }, [t]);

  const handleNew = () => navigation.navigate('JournalEditor', undefined);

  const list = (
    <>
      <JournalStyles.Actions>
        <PrimaryButton label={t(JOURNAL_CONSTANTS.NEW_TITLE)} onPress={handleNew} />
      </JournalStyles.Actions>
      {entries.length === 0 ? <EmptyState image={SCREEN_IMAGES.JOURNAL_EMPTY} message={t(JOURNAL_CONSTANTS.EMPTY)} /> : null}
      {entries.map((entry: JournalEntry) => (
        <JournalEntryCard
          key={entry?.id}
          title={entry?.title || t(JOURNAL_CONSTANTS.UNTITLED)}
          preview={previewText(entry?.body, PREVIEW_LENGTH)}
          dateLabel={formatDateTime(entry?.createdAt)}
          moodLabel={moods[entry?.mood]?.label ?? t(COMMON_CONSTANTS.DASH)}
          moodColor={moods[entry?.mood]?.color ?? ''}
          onPress={() => navigation.navigate('JournalEditor', { entryId: entry?.id })}
        />
      ))}
    </>
  );

  return embedded ? (
    list
  ) : (
    <PageContainer>
      <ScreenHeader title={t(JOURNAL_CONSTANTS.TITLE)} subtitle={t(JOURNAL_CONSTANTS.SUBTITLE)} />
      {list}
    </PageContainer>
  );
};

export default Journal;
