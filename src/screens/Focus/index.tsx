import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import SegmentedControl from '../../components/SegmentedControl';
import Stepper from '../../components/Stepper';
import PrimaryButton from '../../components/PrimaryButton';
import { FocusStyles } from './styles';
import type { SegmentOption } from '../../types';
import { FOCUS_CONSTANTS, FOCUS_PRESETS, FOCUS_RULES } from '../../constants/focus';
import { useFocusTimer } from '../../hooks/useFocusTimer';
import { formatCountdown } from '../../utils/date';

const Focus = () => {
  const { t } = useTranslation();
  const timer = useFocusTimer();
  const clock = formatCountdown(timer.remainingMs);
  const options: SegmentOption[] = useMemo(
    () =>
      FOCUS_PRESETS.map((preset: (typeof FOCUS_PRESETS)[number]) => ({
        label: t(preset.labelKey),
        value: preset.value,
      })),
    [t],
  );

  return (
    <PageContainer>
      <ScreenHeader title={t(FOCUS_CONSTANTS.TITLE)} subtitle={t(FOCUS_CONSTANTS.SUBTITLE)} />
      <SystemPanel variant="monarch">
        <FocusStyles.Clock>
          {clock.minutes}:{clock.seconds}
        </FocusStyles.Clock>
        <FocusStyles.Hint>{t(FOCUS_CONSTANTS.XP_HINT, { xp: FOCUS_RULES.XP })}</FocusStyles.Hint>
        <SegmentedControl options={options} value={timer.preset} onChange={timer.handlePreset} />
        {timer.preset === FOCUS_RULES.CUSTOM ? (
          <FocusStyles.Block>
            <Stepper
              label={t(FOCUS_CONSTANTS.MINUTES)}
              valueLabel={t(FOCUS_CONSTANTS.MINUTES_VALUE, { value: timer.minutes })}
              value={timer.minutes}
              min={FOCUS_RULES.MIN_MINUTES}
              max={FOCUS_RULES.MAX_MINUTES}
              step={FOCUS_RULES.STEP}
              onChange={timer.handleMinutes}
            />
          </FocusStyles.Block>
        ) : null}
        <FocusStyles.Actions>
          {timer.running ? (
            <PrimaryButton label={t(FOCUS_CONSTANTS.PAUSE)} onPress={timer.handlePause} variant="ghost" compact />
          ) : (
            <PrimaryButton label={t(FOCUS_CONSTANTS.START)} onPress={timer.handleStart} compact />
          )}
          <PrimaryButton label={t(FOCUS_CONSTANTS.RESET)} onPress={timer.handleReset} variant="danger" compact />
        </FocusStyles.Actions>
        <FocusStyles.Today>{t(FOCUS_CONSTANTS.TODAY, { count: timer.todayCount })}</FocusStyles.Today>
      </SystemPanel>
    </PageContainer>
  );
};

export default Focus;
