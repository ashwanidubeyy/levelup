import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SegmentedControl from '../../components/SegmentedControl';
import DateNavigator from '../../components/DateNavigator';
import SystemPanel from '../../components/SystemPanel';
import StatTile from '../../components/StatTile';
import AppCountRow from '../../components/AppCountRow';
import InfoRow from '../../components/InfoRow';
import BarChart from '../../components/BarChart';
import Banner from '../../components/Banner';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import AnimeHeroCard from '../../components/AnimeHeroCard';
import { StatsStyles } from './styles';
import type { ConfidenceLevel, FeedSession, MonthlyDay, SegmentOption, TrackedAppId } from '../../types';
import { STATS_CONSTANTS, HOME_CONSTANTS } from '../../constants/screens';
import { COMMON_CONSTANTS, TRACKED_APP_IDS } from '../../constants/common';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { SCREEN_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../store';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useDayStats, useMonthStats } from '../../hooks/useStatsData';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { addDays, formatDayLabel, formatMonthLabel, formatTime, monthOf, shiftMonth, todayKey } from '../../utils/date';
import { isPermissionRequired, resultData } from '../../utils/trackerResult';
import { appLabel, appShortLabel, formatDuration } from '../../utils/format';
import { buildMonthChart, isSameOrAfterMonth } from '../../utils/stats';

const Stats = () => {
  const { t } = useTranslation();
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit) ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const { status } = useTrackerState();
  const { openPermission } = useSettingsActions();
  const [mode, setMode] = useState<string>(STATS_CONSTANTS.MODES.DAY);
  const [day, setDay] = useState<string>(todayKey());
  const [period, setPeriod] = useState(() => monthOf(todayKey()));

  const available = status !== 'comingSoon' && status !== 'unsupported';
  const isDay = mode === STATS_CONSTANTS.MODES.DAY;
  const dayStats = useDayStats(day, available && isDay);
  const monthStats = useMonthStats(period.year, period.month, available && !isDay);
  const currentMonth = monthOf(todayKey());

  const segments: SegmentOption[] = STATS_CONSTANTS.SEGMENTS.map((segment: (typeof STATS_CONSTANTS.SEGMENTS)[number]) => ({
    label: t(segment.labelKey),
    value: segment.value,
  }));

  const counts = resultData(dayStats.counts);
  const usage = resultData(dayStats.usage);
  const sessions = resultData(dayStats.sessions) ?? [];
  const report = resultData(monthStats.report);
  const chart = useMemo(() => buildMonthChart(report, period.year, period.month), [report, period]);
  const permissionMissing = isDay ? isPermissionRequired(dayStats.counts) : isPermissionRequired(monthStats.report);
  const loading = isDay ? dayStats.loading : monthStats.loading;

  const sessionLabel = (session: FeedSession) =>
    t(STATS_CONSTANTS.SESSION_RANGE, {
      app: appShortLabel(session?.app, t),
      start: formatTime(session?.startedAt),
      end: session?.endedAt ? formatTime(session.endedAt) : t(STATS_CONSTANTS.ONGOING),
    });

  const renderNavigator = () =>
    isDay ? (
      <DateNavigator
        label={day === todayKey() ? t(COMMON_CONSTANTS.TODAY) : formatDayLabel(day)}
        onPrevious={() => setDay(addDays(day, -1))}
        onNext={() => setDay(addDays(day, 1))}
        nextDisabled={day >= todayKey()}
        previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
        nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
      />
    ) : (
      <DateNavigator
        label={formatMonthLabel(period.year, period.month)}
        onPrevious={() => setPeriod(shiftMonth(period.year, period.month, -1))}
        onNext={() => setPeriod(shiftMonth(period.year, period.month, 1))}
        nextDisabled={isSameOrAfterMonth(period.year, period.month, currentMonth)}
        previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
        nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
      />
    );

  const renderDayBody = () => (
    <SystemPanel title={t(STATS_CONSTANTS.BY_APP)}>
      {counts && !counts.serviceActive ? <StatsStyles.Note>{t(STATS_CONSTANTS.NOT_TRACKED)}</StatsStyles.Note> : null}
      {TRACKED_APP_IDS.map((app: TrackedAppId) => (
        <AppCountRow
          key={app}
          label={appLabel(app, t)}
          count={counts?.byApp?.[app] ?? 0}
          max={Math.max(counts?.total ?? 0, 1)}
          caption={formatDuration(usage?.feedTimeByApp?.[app] ?? 0, t)}
        />
      ))}
    </SystemPanel>
  );

  const renderConfidence = () => (
    <SystemPanel title={t(STATS_CONSTANTS.CONFIDENCE)} variant="monarch">
      {STATS_CONSTANTS.CONFIDENCE_LEVELS.map((level: ConfidenceLevel) => (
        <AppCountRow
          key={level}
          label={t(COMMON_CONSTANTS.CONFIDENCE[level as keyof typeof COMMON_CONSTANTS.CONFIDENCE])}
          count={counts?.byConfidence?.[level] ?? 0}
          max={Math.max(counts?.total ?? 0, 1)}
        />
      ))}
    </SystemPanel>
  );

  const renderSessions = () => (
    <SystemPanel title={t(STATS_CONSTANTS.SESSIONS_TITLE)}>
      {sessions.length === 0 ? <StatsStyles.Note>{t(STATS_CONSTANTS.NO_SESSIONS)}</StatsStyles.Note> : null}
      {sessions.map((session: FeedSession) => (
        <InfoRow
          key={`${session?.id}-${session?.startedAt}`}
          label={sessionLabel(session)}
          value={t(STATS_CONSTANTS.ITEMS, { count: session?.itemCount ?? 0 })}
        />
      ))}
    </SystemPanel>
  );

  const peakLabel = (entry: MonthlyDay | null) =>
    entry ? t(STATS_CONSTANTS.PEAK_VALUE, { day: formatDayLabel(entry.day), count: entry.total }) : t(COMMON_CONSTANTS.DASH);

  const renderMonth = () => (
    <SystemPanel title={t(STATS_CONSTANTS.DAILY_CHART)}>
      <BarChart data={chart} limit={dailyLimit} />
      <InfoRow label={t(STATS_CONSTANTS.PEAK)} value={peakLabel(report?.peakDay ?? null)} emphasis="danger" />
      <InfoRow label={t(STATS_CONSTANTS.LOWEST)} value={peakLabel(report?.lowestDay ?? null)} emphasis="system" />
      <InfoRow label={t(STATS_CONSTANTS.TRACKED_DAYS)} value={`${report?.trackedDays ?? 0}`} />
    </SystemPanel>
  );

  const renderTiles = () =>
    isDay ? (
      <StatsStyles.Tiles>
        <StatTile label={t(STATS_CONSTANTS.TOTAL)} value={`${counts?.total ?? 0}`} accent={(counts?.total ?? 0) > dailyLimit ? 'danger' : 'system'} />
        <StatTile label={t(STATS_CONSTANTS.FEED_TIME)} value={formatDuration(usage?.feedTimeMs ?? 0, t)} accent="monarch" />
        <StatTile label={t(STATS_CONSTANTS.SESSIONS)} value={`${counts?.sessions ?? 0}`} />
      </StatsStyles.Tiles>
    ) : (
      <StatsStyles.Tiles>
        <StatTile label={t(STATS_CONSTANTS.MONTH_TOTAL)} value={`${report?.total ?? 0}`} />
        <StatTile label={t(STATS_CONSTANTS.AVERAGE)} value={`${report?.averagePerTrackedDay ?? 0}`} accent="monarch" />
        <StatTile label={t(STATS_CONSTANTS.FEED_TIME)} value={formatDuration(report?.feedTimeMs ?? 0, t)} accent="danger" />
      </StatsStyles.Tiles>
    );

  const renderAvailable = () => (
    <StatsStyles.Section>
      <SegmentedControl options={segments} value={mode} onChange={setMode} />
      {permissionMissing ? (
        <Banner
          message={t(STATS_CONSTANTS.PERMISSION)}
          actionLabel={t(HOME_CONSTANTS.FIX)}
          onAction={() => openPermission('accessibility')}
        />
      ) : null}
      {renderNavigator()}
      {loading ? (
        <StatsStyles.LoaderSlot>
          <Loader />
        </StatsStyles.LoaderSlot>
      ) : null}
      {renderTiles()}
      {isDay ? renderDayBody() : renderMonth()}
      {isDay ? renderConfidence() : null}
      {isDay ? renderSessions() : null}
    </StatsStyles.Section>
  );

  return (
    <PageContainer>
      <AnimeHeroCard image={SCREEN_IMAGES.STATS_BANNER} size="short">
        <ScreenHeader title={t(STATS_CONSTANTS.TITLE)} subtitle={t(STATS_CONSTANTS.SUBTITLE)} />
      </AnimeHeroCard>
      {available ? renderAvailable() : <EmptyState image={SCREEN_IMAGES.STATS_EMPTY} message={t(STATS_CONSTANTS.UNAVAILABLE)} />}
    </PageContainer>
  );
};

export default Stats;
