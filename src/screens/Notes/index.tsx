import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';
import { NotesStyles } from './styles';
import type { Note } from '../../types';
import { NOTE_CONSTANTS } from '../../constants/notes';
import { SCREEN_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../store';
import { formatDayLabel } from '../../utils/date';
import { previewText } from '../../utils/helpers';

interface NotesProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const PREVIEW_LENGTH = 120;

const Notes = ({ navigation }: NotesProps) => {
  const { t } = useTranslation();
  const notes = useAppSelector(state => state?.notes?.items) ?? [];

  const handleNew = () => navigation.navigate('NoteEditor');

  const openNote = (noteId: string) => navigation.navigate('NoteEditor', { noteId });

  return (
    <PageContainer>
      <ScreenHeader title={t(NOTE_CONSTANTS.TITLE)} subtitle={t(NOTE_CONSTANTS.SUBTITLE)} />
      <NotesStyles.Actions>
        <PrimaryButton label={t(NOTE_CONSTANTS.NEW_TITLE)} onPress={handleNew} />
      </NotesStyles.Actions>
      {notes.length === 0 ? <EmptyState image={SCREEN_IMAGES.JOURNAL_EMPTY} message={t(NOTE_CONSTANTS.EMPTY)} /> : null}
      {notes.map((note: Note) => (
        <NotesStyles.Card
          key={note?.id}
          onPress={() => openNote(note?.id)}
          accessibilityRole="button"
          accessibilityLabel={note?.title}
        >
          <NotesStyles.DateLabel>{formatDayLabel(note?.day)}</NotesStyles.DateLabel>
          <NotesStyles.Title numberOfLines={1}>{note?.title}</NotesStyles.Title>
          <NotesStyles.Description numberOfLines={3}>{previewText(note?.description, PREVIEW_LENGTH)}</NotesStyles.Description>
        </NotesStyles.Card>
      ))}
    </PageContainer>
  );
};

export default Notes;
