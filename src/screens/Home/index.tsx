import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import AnimeHeroCard from '../../components/AnimeHeroCard';
import RankBadge from '../../components/RankBadge';
import StatBar from '../../components/StatBar';
import SystemPanel from '../../components/SystemPanel';
import StatTile from '../../components/StatTile';
import AppCountRow from '../../components/AppCountRow';
import QuestCard from '../../components/QuestCard';
import QuoteCard from '../../components/QuoteCard';
import Banner from '../../components/Banner';
import NavRow from '../../components/NavRow';
import ComingSoonCard from '../../components/ComingSoonCard';
import { HomeStyles } from './styles';
import type { QuestProgress, TrackedAppId } from '../../types';
import { HOME_CONSTANTS, ONBOARDING_CONSTANTS } from '../../constants/screens';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { TRACKED_APP_IDS } from '../../constants/common';
import { useAppSelector } from '../../store';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useQuestBoard } from '../../hooks/useQuestBoard';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { heroForToday, quoteAt, quoteIndexForToday, ratio } from '../../utils/helpers';
import { QUOTES } from '../../constants/quotes';
import { resultData } from '../../utils/trackerResult';
import { appLabel, formatDuration, limitMessage, toQuestCardProps } from '../../utils/format';

type Props = TabScreenProps<'Home'>;

const PREVIEW_QUESTS = 2;

const Home = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit) ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const { today, todayUsage, live, status } = useTrackerState();
  const { quests, levelInfo } = useQuestBoard();
  const { openPermission, changeTracking } = useSettingsActions();

  const counts = resultData(today);
  const usage = resultData(todayUsage);
  const total = counts?.total ?? 0;
  const danger = ratio(total, dailyLimit) >= TRACKER_CONSTANTS.WARNING_RATIO;
  const isIos = status === 'comingSoon';
  const hero = useMemo(() => heroForToday(), []);
  const [quoteIndex, setQuoteIndex] = useState(quoteIndexForToday);
  const quote = quoteAt(quoteIndex);
  const previewQuests = quests?.slice(0, PREVIEW_QUESTS) ?? [];

  const liveLabel = live?.inFeed
    ? t(TRACKER_CONSTANTS.LIVE.IN_FEED, { app: appLabel(live?.app, t), count: live?.sessionCount ?? 0 })
    : t(TRACKER_CONSTANTS.LIVE.IDLE);

  const renderBanner = () => {
    switch (status) {
      case 'permissionRequired':
        return (
          <Banner
            message={t(HOME_CONSTANTS.PERMISSION_BANNER)}
            actionLabel={t(HOME_CONSTANTS.FIX)}
            onAction={() => openPermission('accessibility')}
          />
        );
      case 'paused':
        return (
          <Banner
            message={t(HOME_CONSTANTS.PAUSED_BANNER)}
            actionLabel={t(HOME_CONSTANTS.RESUME)}
            onAction={() => changeTracking(true)}
            variant="system"
          />
        );
      case 'notConnected':
        return <Banner message={t(ONBOARDING_CONSTANTS.ACCESSIBILITY.WAITING)} variant="system" />;
      case 'comingSoon':
        return <Banner message={t(HOME_CONSTANTS.IOS_BANNER)} variant="monarch" />;
      default:
        return null;
    }
  };

  const renderTracker = () =>
    isIos ? (
      <ComingSoonCard
        title={t(HOME_CONSTANTS.TODAY_TITLE)}
        body={t(TRACKER_CONSTANTS.REASONS['ios-family-controls-entitlement-required'])}
        badge={t(TRACKER_CONSTANTS.STATUS.COMING_SOON)}
      />
    ) : (
      <SystemPanel
        title={t(HOME_CONSTANTS.TODAY_TITLE)}
        rightLabel={t(TRACKER_CONSTANTS.STATUS_LABELS[status])}
        variant={danger ? 'danger' : 'system'}
      >
        <HomeStyles.CountRow>
          <HomeStyles.Count $danger={danger}>{total}</HomeStyles.Count>
          <HomeStyles.Limit>{t(HOME_CONSTANTS.LIMIT_OF, { limit: dailyLimit })}</HomeStyles.Limit>
        </HomeStyles.CountRow>
        <HomeStyles.Message $danger={total > dailyLimit}>{limitMessage(total, dailyLimit, t)}</HomeStyles.Message>
        <StatBar progress={ratio(total, dailyLimit)} variant={danger ? 'danger' : 'system'} />
        <HomeStyles.Live $active={!!live?.inFeed}>{liveLabel}</HomeStyles.Live>
        <HomeStyles.Tiles>
          <StatTile label={t(HOME_CONSTANTS.FEED_TIME)} value={formatDuration(usage?.feedTimeMs ?? 0, t)} />
          <StatTile label={t(HOME_CONSTANTS.SESSIONS)} value={`${counts?.sessions ?? 0}`} accent="monarch" />
        </HomeStyles.Tiles>
        {TRACKED_APP_IDS.map((app: TrackedAppId) => (
          <AppCountRow
            key={app}
            label={appLabel(app, t)}
            count={counts?.byApp?.[app] ?? 0}
            max={Math.max(total, 1)}
          />
        ))}
      </SystemPanel>
    );

  return (
    <PageContainer>
      <AnimeHeroCard image={hero} size="medium">
        <HomeStyles.PlayerRow>
          <RankBadge rank={levelInfo.rank} image={levelInfo.rankImage} size="large" />
          <HomeStyles.PlayerInfo>
            <HomeStyles.PlayerLabel>{t(HOME_CONSTANTS.PLAYER)}</HomeStyles.PlayerLabel>
            <HomeStyles.RankName>{t(levelInfo.rankNameKey)}</HomeStyles.RankName>
            <HomeStyles.LevelRow>
              <HomeStyles.LevelText>{t(HOME_CONSTANTS.LEVEL, { level: levelInfo.level })}</HomeStyles.LevelText>
              <HomeStyles.XpText>
                {t(HOME_CONSTANTS.XP, { current: levelInfo.currentXp, next: levelInfo.nextLevelXp })}
              </HomeStyles.XpText>
            </HomeStyles.LevelRow>
            <StatBar progress={levelInfo.progress} variant="monarch" thin />
          </HomeStyles.PlayerInfo>
        </HomeStyles.PlayerRow>
      </AnimeHeroCard>
      {renderBanner()}
      {renderTracker()}
      <SystemPanel title={t(HOME_CONSTANTS.QUESTS_TITLE)} variant="monarch">
        {previewQuests.map((quest: QuestProgress) => (
          <QuestCard key={quest?.id} image={quest?.image} {...toQuestCardProps(quest, dailyLimit, t)} />
        ))}
        <NavRow label={t(HOME_CONSTANTS.VIEW_ALL)} onPress={() => navigation.navigate('Quests')} />
      </SystemPanel>
      <QuoteCard
        title={t(HOME_CONSTANTS.QUOTE_TITLE)}
        text={t(quote.textKey)}
        author={t(quote.authorKey)}
        image={quote.image}
        hint={t(HOME_CONSTANTS.QUOTE_HINT, { current: quoteIndex % QUOTES.length + 1, total: QUOTES.length })}
        onPress={() => setQuoteIndex((prev: number) => prev + 1)}
      />
    </PageContainer>
  );
};

export default Home;
