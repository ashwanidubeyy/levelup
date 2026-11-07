import React, { useState } from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import type { RootStackParamList, TabScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import QuoteCard from '../../components/QuoteCard';
import HubTile from '../../components/HubTile';
import AppShortcut from '../../components/AppShortcut';
import SystemPanel from '../../components/SystemPanel';
import StatBar from '../../components/StatBar';
import StatTile from '../../components/StatTile';
import AppCountRow from '../../components/AppCountRow';
import Banner from '../../components/Banner';
import ComingSoonCard from '../../components/ComingSoonCard';
import { HomeStyles } from './styles';
import type { AgendaItem, JournalEntry, TrackedAppId } from '../../types';
import { HOME_CONSTANTS, ONBOARDING_CONSTANTS } from '../../constants/screens';
import { HUB_CONSTANTS } from '../../constants/hub';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { FOCUS_RULES } from '../../constants/focus';
import { JOURNAL_CONSTANTS } from '../../constants/journal';
import { TRACKED_APP_IDS } from '../../constants/common';
import { HOME_RULES, SHORTCUT_TARGETS } from '../../constants/shortcuts';
import { useAppSelector } from '../../store';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { previewText, quoteAt, quoteIndexForToday, ratio } from '../../utils/helpers';
import { QUOTES } from '../../constants/quotes';
import { resultData } from '../../utils/trackerResult';
import { appLabel, formatDuration, limitMessage } from '../../utils/format';
import { expensesForMonth, formatAmount, monthKeyFromDay, sumExpenses } from '../../utils/money';
import { formatAgendaDay, formatDayLabel, formatTime, todayKey } from '../../utils/date';
import { buildAgenda } from '../../utils/agenda';
import { openShortcut } from '../../utils/appLinks';
import { openTodosForDay } from '../../utils/todos';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

type Props = TabScreenProps<'Home'>;

const agendaLabel = (item: AgendaItem, translate: (key: string) => string): string =>
  item?.kind === 'holiday' ? translate(item?.titleKey ?? '') : item?.title ?? '';

const agendaMeta = (item: AgendaItem, translate: (key: string, options?: Record<string, string>) => string): string => {
  const dayLabel = formatAgendaDay(item?.day ?? '', translate);
  return item?.kind === 'holiday'
    ? translate(HOME_CONSTANTS.AGENDA_HOLIDAY, { day: dayLabel })
    : translate(HOME_CONSTANTS.AGENDA_REMINDER, {
        day: dayLabel,
        time: formatTime(item?.at ?? 0),
      });
};

const Home = ({ navigation }: Props) => {
  const theme = useTheme() as AppTheme;
  const { t } = useTranslation();
  const rootNavigation = navigation.getParent<NavigationProp<RootStackParamList>>();
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit) ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const reminders = useAppSelector(state => state?.reminders?.items) ?? [];
  const todoItems = useAppSelector(state => state?.todos?.items) ?? [];
  const budget = useAppSelector(state => state?.budget);
  const entries = useAppSelector(state => state?.journal?.entries) ?? [];
  const { today: todayResult, todayUsage, live, status } = useTrackerState();
  const { openPermission, changeTracking } = useSettingsActions();
  const [quoteIndex, setQuoteIndex] = useState(quoteIndexForToday);
  const quote = quoteAt(quoteIndex, theme.assets.backdropArt);
  const counts = resultData(todayResult);
  const usage = resultData(todayUsage);
  const total = counts?.total ?? 0;
  const danger = ratio(total, dailyLimit) >= TRACKER_CONSTANTS.WARNING_RATIO;
  const isIos = status === 'comingSoon';
  const day = todayKey();
  const agenda = buildAgenda(reminders, Date.now(), HOME_RULES.UPCOMING_LIMIT);
  const next = agenda?.[0];
  const latest = entries?.[0] as JournalEntry | undefined;
  const spent = sumExpenses(expensesForMonth(budget?.expenses ?? [], monthKeyFromDay(day)));
  const monthly = budget?.monthlyBudget ?? 0;
  const remaining = monthly - spent;
  const openTasks = openTodosForDay(todoItems, day);

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
        <HomeStyles.DayHint>{t(HOME_CONSTANTS.REEL_DAY_HINT)}</HomeStyles.DayHint>
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
    <PageContainer animatedBackground>
      <QuoteCard
        variant="hero"
        text={t(quote.textKey)}
        author={t(quote.authorKey)}
        image={quote.image}
        hint={t(HOME_CONSTANTS.QUOTE_HINT, { current: quoteIndex % QUOTES.length + 1, total: QUOTES.length })}
        onPress={() => setQuoteIndex((prev: number) => prev + 1)}
      />
      <HomeStyles.Shortcuts>
        {SHORTCUT_TARGETS.map((target: (typeof SHORTCUT_TARGETS)[number]) => (
          <AppShortcut
            key={target.id}
            label={t(target.labelKey)}
            onPress={() => {
              openShortcut(target.app, target.web).catch(() => undefined);
            }}
          />
        ))}
      </HomeStyles.Shortcuts>
      <SystemPanel title={t(HOME_CONSTANTS.UPCOMING)} variant="monarch">
        {agenda.length === 0 ? <HomeStyles.Empty>{t(HOME_CONSTANTS.UPCOMING_EMPTY)}</HomeStyles.Empty> : null}
        {agenda.map((item: AgendaItem) => (
          <HomeStyles.AgendaRow
            key={item?.id}
            onPress={() => navigation.navigate('Calendar', { day: item?.day })}
            accessibilityRole="button"
            accessibilityLabel={agendaLabel(item, t)}
          >
            <HomeStyles.AgendaTitle numberOfLines={1}>{agendaLabel(item, t)}</HomeStyles.AgendaTitle>
            <HomeStyles.AgendaMeta>{agendaMeta(item, t)}</HomeStyles.AgendaMeta>
          </HomeStyles.AgendaRow>
        ))}
      </SystemPanel>
      <HomeStyles.Hub>
        <HubTile
          label={t(HUB_CONSTANTS.CALENDAR)}
          value={next ? agendaLabel(next, t) : t(HUB_CONSTANTS.CALENDAR_EMPTY)}
          hint={next ? agendaMeta(next, t) : t(HUB_CONSTANTS.CALENDAR_EMPTY)}
          accent="system"
          onPress={() => navigation.navigate('Calendar', next?.day ? { day: next.day } : undefined)}
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
        <HubTile
          label={t(HUB_CONSTANTS.JOURNAL)}
          value={latest ? latest?.title || t(JOURNAL_CONSTANTS.UNTITLED) : t(HUB_CONSTANTS.JOURNAL_EMPTY)}
          hint={latest ? previewText(latest?.body ?? '', HOME_RULES.JOURNAL_PREVIEW) : t(HUB_CONSTANTS.JOURNAL_HINT)}
          accent="system"
          onPress={() =>
            latest?.id
              ? navigation.navigate('JournalEditor', { entryId: latest.id })
              : navigation.navigate('JournalHub', { section: 'journal' })
          }
        />
        <HubTile
          label={t(HUB_CONSTANTS.FOCUS)}
          value={t(HOME_CONSTANTS.FOCUS_VALUE, { minutes: FOCUS_RULES.DEFAULT_MINUTES })}
          hint={t(HUB_CONSTANTS.FOCUS_HINT)}
          accent="monarch"
          onPress={() => rootNavigation?.navigate('Focus')}
        />
        <HubTile
          label={t(HUB_CONSTANTS.PLANNER)}
          value={openTasks?.[0]?.title ?? t(HUB_CONSTANTS.PLANNER_EMPTY)}
          hint={
            openTasks.length > 0
              ? t(HUB_CONSTANTS.PLANNER_HINT, { count: openTasks.length })
              : t(HUB_CONSTANTS.PLANNER_EMPTY)
          }
          accent="system"
          onPress={() => rootNavigation?.navigate('Planner')}
        />
      </HomeStyles.Hub>
      {renderBanner()}
      {renderTracker()}
    </PageContainer>
  );
};

export default Home;
