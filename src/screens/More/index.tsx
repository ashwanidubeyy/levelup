import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import NavRow from '../../components/NavRow';
import { MoreStyles } from './styles';
import { MORE_CONSTANTS } from '../../constants/hub';

type Props = TabScreenProps<'More'>;

type MoreRoute = 'Journal' | 'Stats' | 'Calendar' | 'Settings';

const LINKS: Array<{ route: MoreRoute; labelKey: string; hintKey: string }> = [
  { route: 'Journal', labelKey: MORE_CONSTANTS.JOURNAL, hintKey: MORE_CONSTANTS.JOURNAL_HINT },
  { route: 'Stats', labelKey: MORE_CONSTANTS.STATS, hintKey: MORE_CONSTANTS.STATS_HINT },
  { route: 'Calendar', labelKey: MORE_CONSTANTS.CALENDAR, hintKey: MORE_CONSTANTS.CALENDAR_HINT },
  { route: 'Settings', labelKey: MORE_CONSTANTS.SETTINGS, hintKey: MORE_CONSTANTS.SETTINGS_HINT },
];

const More = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ScreenHeader title={t(MORE_CONSTANTS.TITLE)} subtitle={t(MORE_CONSTANTS.SUBTITLE)} />
      <MoreStyles.Block>
        <SystemPanel>
          {LINKS.map((link: (typeof LINKS)[number]) => (
            <NavRow
              key={link.route}
              label={t(link.labelKey)}
              hint={t(link.hintKey)}
              onPress={() => navigation.navigate(link.route)}
            />
          ))}
        </SystemPanel>
      </MoreStyles.Block>
    </PageContainer>
  );
};

export default More;
