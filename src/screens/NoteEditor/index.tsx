import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import KeybordView from '../../components/KeybordView';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import InputField from '../../components/InputField';
import DateNavigator from '../../components/DateNavigator';
import PrimaryButton from '../../components/PrimaryButton';
import { NoteEditorStyles } from './styles';
import type { Note, NoteFormErrors } from '../../types';
import { NOTE_CONSTANTS, NOTE_RULES } from '../../constants/notes';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeNote, upsertNote } from '../../store/slices/notesSlice';
import notesService from '../../services/notes.service';
import { addDays, formatDayLabel, todayKey } from '../../utils/date';

type Props = RootScreenProps<'NoteEditor'>;

const NoteEditor = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const noteId = route?.params?.noteId;
  const note = useAppSelector(state => state?.notes?.items?.find((item: Note) => item?.id === noteId));
  const [title, setTitle] = useState(note?.title ?? '');
  const [description, setDescription] = useState(note?.description ?? '');
  const [day, setDay] = useState(note?.day ?? todayKey());
  const [errors, setErrors] = useState<NoteFormErrors>({});

  const handleSave = () => {
    const nextErrors: NoteFormErrors = {};
    if (!title.trim()) {
      nextErrors.title = NOTE_CONSTANTS.FORMS.VALIDATION.TITLE_REQUIRED;
    }
    if (!description.trim()) {
      nextErrors.description = NOTE_CONSTANTS.FORMS.VALIDATION.DESCRIPTION_REQUIRED;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    const values = { title, description, day };
    const saved = note ? notesService.updateNote(note, values) : notesService.createNote(values);
    dispatch(upsertNote(saved));
    navigation.goBack();
  };

  const confirmDelete = () => {
    if (!note) {
      return;
    }
    dispatch(removeNote(note.id));
    navigation.goBack();
  };

  const handleDelete = () =>
    Alert.alert(t(NOTE_CONSTANTS.MODAL.DELETE_TITLE), t(NOTE_CONSTANTS.MODAL.DELETE_BODY), [
      { text: t(COMMON_CONSTANTS.ACTIONS.CANCEL), style: 'cancel' },
      { text: t(COMMON_CONSTANTS.ACTIONS.DELETE), style: 'destructive', onPress: confirmDelete },
    ]);

  return (
    <KeybordView>
      <PageContainer scrollable={false} withBottomInset fadeIn={false}>
        <ScreenHeader
          title={t(note ? NOTE_CONSTANTS.EDIT_TITLE : NOTE_CONSTANTS.NEW_TITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
          rightLabel={note ? t(COMMON_CONSTANTS.ACTIONS.DELETE) : undefined}
          onRightPress={note ? handleDelete : undefined}
        />
        <NoteEditorStyles.Fields keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <DateNavigator
          label={formatDayLabel(day)}
          onPrevious={() => setDay(addDays(day, -1))}
          onNext={() => setDay(addDays(day, 1))}
          nextDisabled={false}
          previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
          nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
        />
        <NoteEditorStyles.Block>
          <InputField
            label={t(NOTE_CONSTANTS.FORMS.LABELS.TITLE)}
            value={title}
            onChangeText={setTitle}
            placeholder={t(NOTE_CONSTANTS.FORMS.PLACEHOLDERS.TITLE)}
            maxLength={NOTE_RULES.TITLE_MAX}
            error={errors.title ? t(errors.title) : undefined}
          />
          <InputField
            label={t(NOTE_CONSTANTS.FORMS.LABELS.DESCRIPTION)}
            value={description}
            onChangeText={setDescription}
            placeholder={t(NOTE_CONSTANTS.FORMS.PLACEHOLDERS.DESCRIPTION)}
            maxLength={NOTE_RULES.DESCRIPTION_MAX}
            error={errors.description ? t(errors.description) : undefined}
            multiline
          />
        </NoteEditorStyles.Block>
        </NoteEditorStyles.Fields>
        <NoteEditorStyles.Actions>
          <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.SAVE)} onPress={handleSave} />
        </NoteEditorStyles.Actions>
      </PageContainer>
    </KeybordView>
  );
};

export default NoteEditor;
