import React from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import KeybordView from '../../components/KeybordView';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { JournalEditorStyles } from './styles';
import type { JournalEntry } from '../../types';
import { JOURNAL_CONSTANTS } from '../../constants/journal';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeEntry, upsertEntry } from '../../store/slices/journalSlice';
import { awardJournal } from '../../store/slices/questSlice';
import { useJournalForm } from '../../hooks/useJournalForm';
import journalService from '../../services/journal.service';
import questService from '../../services/quest.service';
import { formatDateTime, todayKey } from '../../utils/date';

type Props = RootScreenProps<'JournalEditor'>;

const JournalEditor = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;
  const dispatch = useAppDispatch();
  const entryId = route?.params?.entryId;
  const entry = useAppSelector(state =>
    state?.journal?.entries?.find((item: JournalEntry) => item?.id === entryId),
  );
  const { values, errors, setBody, validate } = useJournalForm(entry);
  const opening = entry?.title?.trim() ?? '';

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
      <PageContainer scrollable={false} withBottomInset fadeIn={false}>
        <ScreenHeader
          title={t(entry ? JOURNAL_CONSTANTS.EDIT_TITLE : JOURNAL_CONSTANTS.NEW_TITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
          rightLabel={entry ? t(COMMON_CONSTANTS.ACTIONS.DELETE) : undefined}
          onRightPress={entry ? handleDelete : undefined}
        />
        <JournalEditorStyles.Page>
          <JournalEditorStyles.Stamp>
            {values.startedAt ? formatDateTime(values.startedAt) : t(JOURNAL_CONSTANTS.STAMP_EMPTY)}
          </JournalEditorStyles.Stamp>
          {opening ? <JournalEditorStyles.LegacyTitle>{opening}</JournalEditorStyles.LegacyTitle> : null}
          <JournalEditorStyles.PageInput
            value={values.body}
            onChangeText={setBody}
            placeholder={t(JOURNAL_CONSTANTS.FORMS.PLACEHOLDERS.BODY)}
            placeholderTextColor={theme.colors.TEXT_DIM}
            multiline
            maxLength={JOURNAL_CONSTANTS.BODY_MAX_LENGTH}
            textAlignVertical="top"
          />
          {errors.body ? <JournalEditorStyles.Error>{t(errors.body)}</JournalEditorStyles.Error> : null}
        </JournalEditorStyles.Page>
        <JournalEditorStyles.Actions>
          <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.SAVE)} onPress={handleSave} />
        </JournalEditorStyles.Actions>
      </PageContainer>
    </KeybordView>
  );
};

export default JournalEditor;
