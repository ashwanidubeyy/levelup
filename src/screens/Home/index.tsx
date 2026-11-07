import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import FadeInView from '../../components/FadeInView';
import AnimeClockWidget from '../../components/AnimeClockWidget';
import ChallengeRewardCard from '../../components/ChallengeRewardCard';
import { HomeStyles } from './styles';
import { HOME_CONSTANTS, ONBOARDING_CONSTANTS } from '../../constants/screens';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { CHALLENGE_CONSTANTS, CHALLENGE_RULES, XP_SOURCES } from '../../constants/challenges';
import { COMMON_CONSTANTS, TIME } from '../../constants/common';
import { TRACKING_SNOOZE_RULES } from '../../constants/trackingSnooze';
import { useAppDispatch, useAppSelector } from '../../store';
import { checkInChallenge } from '../../store/slices/challengeSlice';
import { awardXp } from '../../store/slices/questSlice';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { clamp, ratio } from '../../utils/helpers';
import { resultData } from '../../utils/trackerResult';
import { appLabel, formatDuration } from '../../utils/format';
import { todayKey } from '../../utils/date';
import { activeChallenge, canCheckIn, challengeRatio, challengeStreak } from '../../utils/challenges';
import { isTrackingSnoozed } from '../../utils/trackingSnooze';
import { makeXp } from '../../utils/progress';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state?.settings);
  const dailyLimit = settings?.dailyLimit ?? TRACKER_CONSTANTS.LIMIT.DEFAULT;
  const challenges = useAppSelector(state => state?.challenges?.items) ?? [];
  const { today: todayResult, todayUsage, live, status } = useTrackerState();
  const actions = useSettingsActions();
  const counts = resultData(todayResult);
  const usage = resultData(todayUsage);
  const total = counts?.total ?? 0;
  const exceeded = total > dailyLimit;
  const progress = ratio(total, dailyLimit);
  const isIos = status === 'comingSoon';
  const day = todayKey();
  const challenge = activeChallenge(challenges, day);
  const streak = challengeStreak(challenge, day);
  const snoozed = isTrackingSnoozed(settings, Date.now());
  const fill = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: clamp(progress, 0, 1),
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [fill, progress]);

  const barWidth = fill.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const liveLabel = live?.inFeed
    ? t(TRACKER_CONSTANTS.LIVE.IN_FEED, { app: appLabel(live?.app, t), count: live?.sessionCount ?? 0 })
    : t(TRACKER_CONSTANTS.LIVE.IDLE);

  const handleCheckIn = () => {
    if (!challenge || !canCheckIn(challenge, day)) {
      return;
    }
    dispatch(checkInChallenge({ id: challenge.id, day }));
    dispatch(awardXp(makeXp(day, XP_SOURCES.CHECK_IN, CHALLENGE_RULES.CHECK_IN_XP)));
  };

  const handleSnooze = () => {
    if (snoozed) {
      actions.endSnooze();
      return;
    }
    actions.snoozeTracking(Date.now() + TRACKING_SNOOZE_RULES.MINUTES[0] * TIME.MINUTE_MS);
  };

  const renderTracker = () =>
    isIos ? (
      <HomeStyles.Card>
        <HomeStyles.CardTitle>{t(TRACKER_CONSTANTS.STATUS.COMING_SOON)}</HomeStyles.CardTitle>
        <HomeStyles.Body>{t(HOME_CONSTANTS.IOS_BANNER)}</HomeStyles.Body>
      </HomeStyles.Card>
    ) : (
      <HomeStyles.Card>
        <HomeStyles.CardHeader>
          <HomeStyles.CardTitle>{t(HOME_CONSTANTS.REEL_TITLE)}</HomeStyles.CardTitle>
          <HomeStyles.CardValue>{t(HOME_CONSTANTS.REEL_RATIO, { count: total, limit: dailyLimit })}</HomeStyles.CardValue>
        </HomeStyles.CardHeader>
        <HomeStyles.Track>
          <HomeStyles.Fill $danger={exceeded} style={{ width: barWidth }} />
        </HomeStyles.Track>
        <HomeStyles.MetaRow>
          <HomeStyles.Meta>{t(HOME_CONSTANTS.FEED_LINE, { time: formatDuration(usage?.feedTimeMs ?? 0, t) })}</HomeStyles.Meta>
          <HomeStyles.Snooze onPress={handleSnooze} accessibilityRole="button">
            <HomeStyles.SnoozeLabel>
              {t(snoozed ? HOME_CONSTANTS.RESUME : HOME_CONSTANTS.SNOOZE)}
            </HomeStyles.SnoozeLabel>
          </HomeStyles.Snooze>
        </HomeStyles.MetaRow>
        <HomeStyles.Live $active={!!live?.inFeed}>{liveLabel}</HomeStyles.Live>
        {status === 'permissionRequired' ? (
          <HomeStyles.NoteAction onPress={() => actions.openPermission('accessibility')}>
            {t(HOME_CONSTANTS.PERMISSION_BANNER)}
          </HomeStyles.NoteAction>
        ) : null}
        {status === 'paused' && !snoozed ? (
          <HomeStyles.NoteAction onPress={() => actions.changeTracking(true)}>{t(HOME_CONSTANTS.PAUSED_BANNER)}</HomeStyles.NoteAction>
        ) : null}
        {status === 'notConnected' ? <HomeStyles.Note>{t(ONBOARDING_CONSTANTS.ACCESSIBILITY.WAITING)}</HomeStyles.Note> : null}
      </HomeStyles.Card>
    );

  return (
    <PageContainer fadeIn={false}>
      <FadeInView>
        <HomeStyles.TopBar>
          <HomeStyles.Greeting>{t(HOME_CONSTANTS.GREETING)}</HomeStyles.Greeting>
          <HomeStyles.StreakPill>
            <HomeStyles.StreakText>{t(HOME_CONSTANTS.STREAK, { count: streak })}</HomeStyles.StreakText>
          </HomeStyles.StreakPill>
        </HomeStyles.TopBar>
        <HomeStyles.Subtitle>{t(COMMON_CONSTANTS.APP_NAME)}</HomeStyles.Subtitle>
      </FadeInView>
      <FadeInView delay={40}>
        <ChallengeRewardCard
          title={challenge ? t(HOME_CONSTANTS.CHALLENGE_GOAL, { title: challenge.title }) : t(HOME_CONSTANTS.CHALLENGE_EMPTY_TITLE)}
          reward={
            challenge
              ? t(challenge.reward ? HOME_CONSTANTS.CHALLENGE_REWARD : HOME_CONSTANTS.CHALLENGE_REWARD_EMPTY, {
                  reward: challenge.reward ?? '',
                })
              : t(HOME_CONSTANTS.CHALLENGE_EMPTY_BODY)
          }
          progressLabel={
            challenge
              ? t(HOME_CONSTANTS.CHALLENGE_PROGRESS, {
                  done: challenge.checkIns?.length ?? 0,
                  total: challenge.days ?? 0,
                })
              : ''
          }
          progress={challenge ? challengeRatio(challenge) : 0}
          total={challenge?.days ?? 0}
          done={challenge?.checkIns?.length ?? 0}
          checkInLabel={t(CHALLENGE_CONSTANTS.CHECK_IN)}
          canCheckIn={challenge ? canCheckIn(challenge, day) : false}
          onCheckIn={handleCheckIn}
        />
      </FadeInView>
      <FadeInView delay={80}>
        <AnimeClockWidget />
      </FadeInView>
      <FadeInView delay={120}>{renderTracker()}</FadeInView>
    </PageContainer>
  );
};

export default Home;
