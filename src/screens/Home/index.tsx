import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import QuoteCard from '../../components/QuoteCard';
import LevelCard from '../../components/LevelCard';
import HubTile from '../../components/HubTile';
import SystemPanel from '../../components/SystemPanel';
import StatBar from '../../components/StatBar';
import StatTile from '../../components/StatTile';
import AppCountRow from '../../components/AppCountRow';
import Banner from '../../components/Banner';
import ComingSoonCard from '../../components/ComingSoonCard';
import { HomeStyles } from './styles';
import type { Challenge, TrackedAppId } from '../../types';
import { HOME_CONSTANTS, ONBOARDING_CONSTANTS } from '../../constants/screens';
import { HUB_CONSTANTS } from '../../constants/hub';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { FOCUS_RULES } from '../../constants/focus';
import { TRACKED_APP_IDS } from '../../constants/common';
import { useAppSelector } from '../../store';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { quoteAt, quoteIndexForToday, ratio } from '../../utils/helpers';
import { QUOTES } from '../../constants/quotes';
import { resultData } from '../../utils/trackerResult';
import { appLabel, formatDuration, limitMessage } from '../../utils/format';
import { buildLevelInfo } from '../../utils/level';
import { canCheckIn } from '../../utils/challenges';
import { nextReminderAt } from '../../utils/reminders';
import { expensesForMonth, formatAmount, monthKeyFromDay, sumExpenses } from '../../utils/money';
import { formatClock, todayKey } from '../../utils/date';

type Props = TabScreenProps<'Home'>;

const Home = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit) ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const xp = useAppSelector(state => state?.quests?.xp) ?? 0;
  const challenges = useAppSelector(state => state?.challenges?.items) ?? [];
  const reminders = useAppSelector(state => state?.reminders?.items) ?? [];
  const budget = useAppSelector(state => state?.budget);
  const { today: todayResult, todayUsage, live, status } = useTrackerState();
  const { openPermission, changeTracking } = useSettingsActions();
  const levelInfo = useMemo(() => buildLevelInfo(xp), [xp]);
  const [quoteIndex, setQuoteIndex] = useState(quoteIndexForToday);
  const quote = quoteAt(quoteIndex);
  const counts = resultData(todayResult);
  const usage = resultData(todayUsage);
  const total = counts?.total ?? 0;
  const danger = ratio(total, dailyLimit) >= TRACKER_CONSTANTS.WARNING_RATIO;
  const isIos = status === 'comingSoon';
  const day = todayKey();
  const openChallenges = challenges?.filter((item: Challenge) => !item?.completedAt) ?? [];
  const pendingCheckIns = openChallenges.filter((item: Challenge) => canCheckIn(item, day)).length;
  const upcoming = nextReminderAt(reminders, Date.now());
  const spent = sumExpenses(expensesForMonth(budget?.expenses ?? [], monthKeyFromDay(day)));
  const monthly = budget?.monthlyBudget ?? 0;
  const remaining = monthly - spent;

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
      <QuoteCard
        title={t(HOME_CONSTANTS.QUOTE_TITLE)}
        text={t(quote.textKey)}
        author={t(quote.authorKey)}
        image={quote.image}
        hint={t(HOME_CONSTANTS.QUOTE_HINT, { current: quoteIndex % QUOTES.length + 1, total: QUOTES.length })}
        onPress={() => setQuoteIndex((prev: number) => prev + 1)}
      />
      <LevelCard
        title={t(HUB_CONSTANTS.LEVEL_TITLE)}
        levelLabel={t(HOME_CONSTANTS.LEVEL, { level: levelInfo.level })}
        xpLabel={t(HOME_CONSTANTS.XP, { current: levelInfo.currentXp, next: levelInfo.nextLevelXp })}
        progress={levelInfo.progress}
      />
      <HomeStyles.Hub>
        <HubTile
          label={t(HUB_CONSTANTS.FOCUS)}
          value={t(HOME_CONSTANTS.FOCUS_VALUE, { minutes: FOCUS_RULES.DEFAULT_MINUTES })}
          hint={t(HUB_CONSTANTS.FOCUS_HINT)}
          accent="monarch"
          onPress={() => navigation.navigate('Focus')}
        />
        <HubTile
          label={t(HUB_CONSTANTS.CHALLENGES)}
          value={`${openChallenges.length}`}
          hint={t(pendingCheckIns > 0 ? HUB_CONSTANTS.CHALLENGE_CHECK : HUB_CONSTANTS.CHALLENGE_HINT, {
            count: pendingCheckIns,
          })}
          accent="system"
          onPress={() => navigation.navigate('Challenges')}
        />
        <HubTile
          label={t(HUB_CONSTANTS.CALENDAR)}
          value={upcoming ? formatClock(upcoming.reminder.hour, upcoming.reminder.minute) : t(HUB_CONSTANTS.CALENDAR_EMPTY)}
          hint={upcoming?.reminder?.title ?? t(HUB_CONSTANTS.CALENDAR_EMPTY)}
          accent="system"
          onPress={() => navigation.navigate('Calendar')}
        />
        <HubTile
          label={t(HUB_CONSTANTS.BUDGET)}
          value={formatAmount(monthly > 0 ? remaining : spent)}
          hint={t(monthly > 0 ? HUB_CONSTANTS.BUDGET_HINT : HUB_CONSTANTS.BUDGET_EMPTY, {
            spent: formatAmount(spent),
          })}
          accent={monthly > 0 && remaining < 0 ? 'danger' : 'monarch'}
          onPress={() => navigation.navigate('Budget')}
        />
      </HomeStyles.Hub>
      {renderBanner()}
      {renderTracker()}
    </PageContainer>
  );
};

export default Home;
