import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SegmentedControl from '../../components/SegmentedControl';
import KeybordView from '../../components/KeybordView';
import Journal from '../Journal';
import Challenges from '../Challenges';
import { JournalHubStyles } from './styles';
import { JOURNAL_HUB_CONSTANTS, JOURNAL_HUB_SECTIONS } from '../../constants/journalHub';

type Props = TabScreenProps<'JournalHub'>;

const JournalHub = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const paramSection = route.params?.section;
  const [section, setSection] = useState<string>(paramSection ?? JOURNAL_HUB_SECTIONS.JOURNAL);

  useEffect(() => {
    if (paramSection) {
      setSection(paramSection);
    }
  }, [paramSection]);

  return (
    <KeybordView>
      <PageContainer>
        <ScreenHeader title={t(JOURNAL_HUB_CONSTANTS.TITLE)} subtitle={t(JOURNAL_HUB_CONSTANTS.SUBTITLE)} />
        <JournalHubStyles.Switch>
          <SegmentedControl
            value={section}
            onChange={setSection}
            options={[
              { value: JOURNAL_HUB_SECTIONS.JOURNAL, label: t(JOURNAL_HUB_CONSTANTS.SECTION_JOURNAL) },
              { value: JOURNAL_HUB_SECTIONS.CHALLENGES, label: t(JOURNAL_HUB_CONSTANTS.SECTION_CHALLENGES) },
            ]}
          />
        </JournalHubStyles.Switch>
        {section === JOURNAL_HUB_SECTIONS.JOURNAL ? (
          <Journal embedded navigation={navigation} route={route} />
        ) : null}
        {section === JOURNAL_HUB_SECTIONS.CHALLENGES ? <Challenges embedded /> : null}
      </PageContainer>
    </KeybordView>
  );
};

export default JournalHub;
