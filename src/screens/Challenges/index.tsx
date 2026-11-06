import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import KeybordView from '../../components/KeybordView';
import ScreenHeader from '../../components/ScreenHeader';
import LevelCard from '../../components/LevelCard';
import SystemPanel from '../../components/SystemPanel';
import SegmentedControl from '../../components/SegmentedControl';
import InputField from '../../components/InputField';
import Stepper from '../../components/Stepper';
import DateNavigator from '../../components/DateNavigator';
import ToggleRow from '../../components/ToggleRow';
import PrimaryButton from '../../components/PrimaryButton';
import ChallengeCard from '../../components/ChallengeCard';
import { ChallengesStyles } from './styles';
import type { Challenge, SegmentOption, XpLogEntry } from '../../types';
import { CHALLENGE_CONSTANTS, CHALLENGE_PRESETS, CHALLENGE_RULES, XP_SOURCES } from '../../constants/challenges';
import { HOME_CONSTANTS } from '../../constants/screens';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { addChallenge, checkInChallenge, removeChallenge } from '../../store/slices/challengeSlice';
import { awardXp } from '../../store/slices/questSlice';
import { addDays, formatClock, formatDayLabel, todayKey } from '../../utils/date';
import { canCheckIn, challengeEndDay, challengeRatio, sortChallenges } from '../../utils/challenges';
import { buildLevelInfo } from '../../utils/level';
import { generateId } from '../../utils/helpers';
import { makeXp, xpSourceKey } from '../../utils/progress';

const RECENT_LIMIT = 4;

const Challenges = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state?.challenges?.items);
  const xp = useAppSelector(state => state?.quests?.xp) ?? 0;
  const log = useAppSelector(state => state?.quests?.log) ?? [];
  const levelInfo = useMemo(() => buildLevelInfo(xp), [xp]);
  const sorted = useMemo(() => sortChallenges(items ?? []), [items]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [preset, setPreset] = useState<string>(CHALLENGE_RULES.PRESET_21);
  const [customDays, setCustomDays] = useState(21);
  const [startDay, setStartDay] = useState(todayKey());
  const [hour, setHour] = useState<number>(CHALLENGE_RULES.DEFAULT_HOUR);
  const [minute, setMinute] = useState<number>(CHALLENGE_RULES.DEFAULT_MINUTE);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [error, setError] = useState('');

  const presets: SegmentOption[] = CHALLENGE_PRESETS.map((item: (typeof CHALLENGE_PRESETS)[number]) => ({
    label: t(item.labelKey),
    value: item.value,
  }));
  const dayCount = preset === CHALLENGE_RULES.CUSTOM ? customDays : Number(preset);
  const recent = log?.slice(0, RECENT_LIMIT) ?? [];

  const handleCreate = () => {
    const name = title?.trim() ?? '';
    if (!name) {
      setError(CHALLENGE_CONSTANTS.VALIDATION.TITLE);
      return;
    }
    const challenge: Challenge = {
      id: generateId(),
      title: name,
      startDay,
      days: dayCount,
      reminderHour: hour,
      reminderMinute: minute,
      reminderEnabled,
      checkIns: [],
      completedAt: null,
      createdAt: Date.now(),
    };
    dispatch(addChallenge(challenge));
    setTitle('');
    setError('');
    setOpen(false);
  };

  const handleCheckIn = (challenge: Challenge) => {
    const day = todayKey();
    if (!canCheckIn(challenge, day)) {
      return;
    }
    dispatch(checkInChallenge({ id: challenge.id, day }));
    dispatch(awardXp(makeXp(day, XP_SOURCES.CHECK_IN, CHALLENGE_RULES.CHECK_IN_XP)));
  };

  return (
    <KeybordView>
      <PageContainer animatedBackground>
        <ScreenHeader title={t(CHALLENGE_CONSTANTS.TITLE)} subtitle={t(CHALLENGE_CONSTANTS.SUBTITLE)} />
        <LevelCard
          title={t(CHALLENGE_CONSTANTS.LEVEL_TITLE)}
          levelLabel={t(HOME_CONSTANTS.LEVEL, { level: levelInfo.level })}
          xpLabel={t(HOME_CONSTANTS.XP, { current: levelInfo.currentXp, next: levelInfo.nextLevelXp })}
          progress={levelInfo.progress}
        />
        <ChallengesStyles.Block>
          <PrimaryButton
            label={open ? t(COMMON_CONSTANTS.ACTIONS.CANCEL) : t(CHALLENGE_CONSTANTS.NEW)}
            onPress={() => setOpen(!open)}
            variant={open ? 'ghost' : 'primary'}
          />
        </ChallengesStyles.Block>
        {open ? (
          <SystemPanel title={t(CHALLENGE_CONSTANTS.NEW)}>
            <InputField
              label={t(CHALLENGE_CONSTANTS.NAME)}
              value={title}
              onChangeText={setTitle}
              placeholder={t(CHALLENGE_CONSTANTS.NAME_PLACEHOLDER)}
              error={error ? t(error) : undefined}
            />
            <ChallengesStyles.Block>
              <SegmentedControl options={presets} value={preset} onChange={setPreset} />
            </ChallengesStyles.Block>
            {preset === CHALLENGE_RULES.CUSTOM ? (
              <Stepper
                label={t(CHALLENGE_CONSTANTS.DAYS)}
                valueLabel={t(CHALLENGE_CONSTANTS.DAYS_VALUE, { count: customDays })}
                value={customDays}
                min={CHALLENGE_RULES.MIN_DAYS}
                max={CHALLENGE_RULES.MAX_DAYS}
                step={1}
                onChange={setCustomDays}
              />
            ) : null}
            <DateNavigator
              label={formatDayLabel(startDay)}
              onPrevious={() => setStartDay(addDays(startDay, -1))}
              onNext={() => setStartDay(addDays(startDay, 1))}
              nextDisabled={false}
              previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
              nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
            />
            <ToggleRow
              label={t(CHALLENGE_CONSTANTS.REMINDER)}
              hint={t(CHALLENGE_CONSTANTS.REMINDER_HINT)}
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
            />
            {reminderEnabled ? (
              <ChallengesStyles.Block>
                <Stepper
                  label={t(CHALLENGE_CONSTANTS.HOUR)}
                  valueLabel={formatClock(hour, minute)}
                  value={hour}
                  min={0}
                  max={CHALLENGE_RULES.HOUR_MAX}
                  step={1}
                  onChange={setHour}
                />
                <Stepper
                  label={t(CHALLENGE_CONSTANTS.MINUTE)}
                  valueLabel={formatClock(hour, minute)}
                  value={minute}
                  min={0}
                  max={CHALLENGE_RULES.MINUTE_MAX}
                  step={CHALLENGE_RULES.MINUTE_STEP}
                  onChange={setMinute}
                />
              </ChallengesStyles.Block>
            ) : null}
            <ChallengesStyles.Block>
              <PrimaryButton label={t(CHALLENGE_CONSTANTS.CREATE)} onPress={handleCreate} />
            </ChallengesStyles.Block>
          </SystemPanel>
        ) : null}
        {sorted.length === 0 ? <ChallengesStyles.Empty>{t(CHALLENGE_CONSTANTS.EMPTY)}</ChallengesStyles.Empty> : null}
        {sorted.map((challenge: Challenge) => (
          <ChallengeCard
            key={challenge?.id}
            title={challenge?.title ?? ''}
            rangeLabel={t(CHALLENGE_CONSTANTS.RANGE, {
              start: formatDayLabel(challenge?.startDay),
              end: formatDayLabel(challengeEndDay(challenge)),
            })}
            progressLabel={t(CHALLENGE_CONSTANTS.PROGRESS, {
              done: challenge?.checkIns?.length ?? 0,
              total: challenge?.days ?? 0,
            })}
            progress={challengeRatio(challenge)}
            xpLabel={t(CHALLENGE_CONSTANTS.XP_LINE, {
              daily: CHALLENGE_RULES.CHECK_IN_XP,
              bonus: CHALLENGE_RULES.COMPLETE_XP,
            })}
            checkInLabel={t(CHALLENGE_CONSTANTS.CHECK_IN)}
            deleteLabel={t(COMMON_CONSTANTS.ACTIONS.DELETE)}
            doneLabel={t(CHALLENGE_CONSTANTS.DONE)}
            canCheckIn={canCheckIn(challenge, todayKey())}
            completed={!!challenge?.completedAt}
            onCheckIn={() => handleCheckIn(challenge)}
            onDelete={() => dispatch(removeChallenge(challenge?.id))}
          />
        ))}
        {recent.length > 0 ? (
          <SystemPanel title={t(CHALLENGE_CONSTANTS.RECENT)} variant="monarch">
            {recent.map((entry: XpLogEntry) => (
              <ChallengesStyles.Log key={entry?.id}>
                {t(xpSourceKey(entry?.questId))} · {entry?.xp > 0 ? '+' : ''}
                {entry?.xp}
              </ChallengesStyles.Log>
            ))}
          </SystemPanel>
        ) : null}
      </PageContainer>
    </KeybordView>
  );
};

export default Challenges;
