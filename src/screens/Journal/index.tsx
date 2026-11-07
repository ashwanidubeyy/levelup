import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import JournalEntryCard from '../../components/JournalEntryCard';
import EmptyState from '../../components/EmptyState';
import { JournalStyles } from './styles';
import type { JournalEntry } from '../../types';
import { JOURNAL_CONSTANTS } from '../../constants/journal';
import { SCREEN_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../store';
import { formatDateTime } from '../../utils/date';
import { previewText } from '../../utils/helpers';

interface JournalProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const PREVIEW_LENGTH = 180;

const Journal = ({ navigation }: JournalProps) => {
  const { t } = useTranslation();
  const entries = useAppSelector(state => state?.journal?.entries) ?? [];

  const handleNew = () => navigation.navigate('JournalEditor');

  const openEntry = (entryId: string) => navigation.navigate('JournalEditor', { entryId });

  return (
    <PageContainer>
      <ScreenHeader title={t(JOURNAL_CONSTANTS.TITLE)} subtitle={t(JOURNAL_CONSTANTS.SUBTITLE)} />
      <JournalStyles.Actions>
        <PrimaryButton label={t(JOURNAL_CONSTANTS.NEW_TITLE)} onPress={handleNew} />
      </JournalStyles.Actions>
      {entries.length === 0 ? <EmptyState image={SCREEN_IMAGES.JOURNAL_EMPTY} message={t(JOURNAL_CONSTANTS.EMPTY)} /> : null}
      {entries.map((entry: JournalEntry) => (
        <JournalEntryCard
          key={entry?.id}
          dateLabel={formatDateTime(entry?.createdAt)}
          opening={entry?.title?.trim() ? entry.title : undefined}
          preview={previewText(entry?.body, PREVIEW_LENGTH)}
          onPress={() => openEntry(entry?.id)}
        />
      ))}
    </PageContainer>
  );
};

export default Journal;
