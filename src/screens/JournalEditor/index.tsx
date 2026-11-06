import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import KeybordView from '../../components/KeybordView';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import InputField from '../../components/InputField';
import MoodSelector from '../../components/MoodSelector';
import PrimaryButton from '../../components/PrimaryButton';
import { JournalEditorStyles } from './styles';
import type { JournalEntry, MoodOption } from '../../types';
import { JOURNAL_CONSTANTS } from '../../constants/journal';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeEntry, upsertEntry } from '../../store/slices/journalSlice';
import { awardJournal } from '../../store/slices/questSlice';
import { useJournalForm } from '../../hooks/useJournalForm';
import journalService from '../../services/journal.service';
import questService from '../../services/quest.service';
import { todayKey } from '../../utils/date';

type Props = RootScreenProps<'JournalEditor'>;

const JournalEditor = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const entryId = route?.params?.entryId;
  const entry = useAppSelector(state =>
    state?.journal?.entries?.find((item: JournalEntry) => item?.id === entryId),
  );
  const { values, errors, setTitle, setBody, setMood, validate } = useJournalForm(entry);

  const moodOptions: MoodOption[] = useMemo(
    () =>
      JOURNAL_CONSTANTS.MOOD_OPTIONS.map((mood: (typeof JOURNAL_CONSTANTS.MOOD_OPTIONS)[number]) => ({
        value: mood.value,
        label: t(mood.labelKey),
        color: mood.color,
      })),
    [t],
  );

  const handleSave = () => {
    if (!validate()) {
      return;
    }
    const saved = entry ? journalService.updateEntry(entry, values) : journalService.createEntry(values);
    dispatch(upsertEntry(saved));
    if (!entry && saved.day === todayKey()) {
      dispatch(awardJournal(questService.journalAward(saved.day)));
    }
    navigation.goBack();
  };

  const confirmDelete = () => {
    if (!entry) {
      return;
    }
    dispatch(removeEntry(entry.id));
    navigation.goBack();
  };

  const handleDelete = () =>
    Alert.alert(t(JOURNAL_CONSTANTS.MODAL.DELETE_TITLE), t(JOURNAL_CONSTANTS.MODAL.DELETE_BODY), [
      { text: t(COMMON_CONSTANTS.ACTIONS.CANCEL), style: 'cancel' },
      { text: t(COMMON_CONSTANTS.ACTIONS.DELETE), style: 'destructive', onPress: confirmDelete },
    ]);

  return (
    <KeybordView>
      <PageContainer withBottomInset>
        <ScreenHeader
          title={t(entry ? JOURNAL_CONSTANTS.EDIT_TITLE : JOURNAL_CONSTANTS.NEW_TITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
          rightLabel={entry ? t(COMMON_CONSTANTS.ACTIONS.DELETE) : undefined}
          onRightPress={entry ? handleDelete : undefined}
        />
        <InputField
          label={t(JOURNAL_CONSTANTS.FORMS.LABELS.TITLE)}
          value={values.title}
          onChangeText={setTitle}
          placeholder={t(JOURNAL_CONSTANTS.FORMS.PLACEHOLDERS.TITLE)}
          maxLength={JOURNAL_CONSTANTS.TITLE_MAX_LENGTH}
        />
        <InputField
          label={t(JOURNAL_CONSTANTS.FORMS.LABELS.BODY)}
          value={values.body}
          onChangeText={setBody}
          placeholder={t(JOURNAL_CONSTANTS.FORMS.PLACEHOLDERS.BODY)}
          error={errors.body ? t(errors.body) : undefined}
          maxLength={JOURNAL_CONSTANTS.BODY_MAX_LENGTH}
          multiline
        />
        <JournalEditorStyles.MoodLabel>{t(JOURNAL_CONSTANTS.FORMS.LABELS.MOOD).toUpperCase()}</JournalEditorStyles.MoodLabel>
        <MoodSelector options={moodOptions} value={values.mood} onChange={setMood} />
        <JournalEditorStyles.Actions>
          <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.SAVE)} onPress={handleSave} />
        </JournalEditorStyles.Actions>
      </PageContainer>
    </KeybordView>
  );
};

export default JournalEditor;
