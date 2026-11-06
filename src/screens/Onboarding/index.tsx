import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import OnboardingStep from '../../components/OnboardingStep';
import PrimaryButton from '../../components/PrimaryButton';
import PermissionStep from '../../components/PermissionStep';
import BulletList from '../../components/BulletList';
import ToggleRow from '../../components/ToggleRow';
import Stepper from '../../components/Stepper';
import Banner from '../../components/Banner';
import ComingSoonCard from '../../components/ComingSoonCard';
import { OnboardingStyles } from './styles';
import { ONBOARDING_CONSTANTS, SETTINGS_CONSTANTS } from '../../constants/screens';
import { COMMON_CONSTANTS, TIME } from '../../constants/common';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { ONBOARDING_IMAGES } from '../../constants/images';
import { useAppDispatch, useAppSelector } from '../../store';
import { setOnboardingComplete } from '../../store/slices/settingsSlice';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { useAppActive } from '../../hooks/useAppActive';

type Props = RootScreenProps<'Onboarding'>;

type StepId = keyof typeof ONBOARDING_CONSTANTS.COPY;

const { STEPS, FLOWS, COPY } = ONBOARDING_CONSTANTS;

const Onboarding = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { capabilities } = useTrackerState();
  const overlayEnabled = useAppSelector(state => state?.settings?.overlayEnabled);
  const dailyLimit = useAppSelector(state => state?.settings?.dailyLimit);
  const { changeOverlay, changeLimit, openPermission, refreshCapabilities } = useSettingsActions();
  const [stepIndex, setStepIndex] = useState(0);

  const steps: readonly StepId[] = capabilities?.platform === TRACKER_CONSTANTS.PLATFORM.IOS ? FLOWS.IOS : FLOWS.ANDROID;
  const step = steps[Math.min(stepIndex, steps.length - 1)];
  const isLast = stepIndex >= steps.length - 1;
  const permissions = capabilities?.permissions;
  const statusLabel = (granted: boolean) => t(granted ? SETTINGS_CONSTANTS.GRANTED : SETTINGS_CONSTANTS.MISSING);

  useAppActive(refreshCapabilities);

  useEffect(() => {
    refreshCapabilities();
  }, [refreshCapabilities]);

  useEffect(() => {
    if (step !== STEPS.ACCESSIBILITY) {
      return undefined;
    }
    const interval = setInterval(refreshCapabilities, TIME.PERMISSION_POLL_MS);
    return () => clearInterval(interval);
  }, [step, refreshCapabilities]);

  const handleNext = () => {
    if (isLast) {
      dispatch(setOnboardingComplete(true));
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      return;
    }
    setStepIndex((prev: number) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => setStepIndex((prev: number) => Math.max(prev - 1, 0));

  const accessibilityStatus = () => {
    if (!permissions?.accessibility) {
      return t(SETTINGS_CONSTANTS.MISSING);
    }
    return t(capabilities?.serviceConnected ? ONBOARDING_CONSTANTS.ACCESSIBILITY.GRANTED : ONBOARDING_CONSTANTS.ACCESSIBILITY.WAITING);
  };

  const renderPrivacy = () => (
    <OnboardingStyles.Section>
      <OnboardingStyles.SectionTitle>{t(ONBOARDING_CONSTANTS.PRIVACY.OBSERVES_TITLE)}</OnboardingStyles.SectionTitle>
      <BulletList items={ONBOARDING_CONSTANTS.PRIVACY.OBSERVES.map((key: string) => t(key))} tone="allowed" />
      <OnboardingStyles.SectionTitle>{t(ONBOARDING_CONSTANTS.PRIVACY.NEVER_TITLE)}</OnboardingStyles.SectionTitle>
      <BulletList items={ONBOARDING_CONSTANTS.PRIVACY.NEVER.map((key: string) => t(key))} tone="denied" />
    </OnboardingStyles.Section>
  );

  const renderAccessibility = () => (
    <OnboardingStyles.Section>
      <PermissionStep
        title={t(SETTINGS_CONSTANTS.ACCESSIBILITY)}
        granted={!!permissions?.accessibility}
        statusLabel={accessibilityStatus()}
        actionLabel={t(ONBOARDING_CONSTANTS.ACCESSIBILITY.OPEN)}
        onAction={() => openPermission('accessibility')}
      />
      {capabilities?.restrictedSettingsLikely && !permissions?.accessibility ? (
        <Banner
          message={t(ONBOARDING_CONSTANTS.ACCESSIBILITY.RESTRICTED)}
          actionLabel={t(ONBOARDING_CONSTANTS.ACCESSIBILITY.OPEN_APP_INFO)}
          onAction={() => openPermission('appDetails')}
          variant="monarch"
        />
      ) : null}
    </OnboardingStyles.Section>
  );

  const renderOverlay = () => (
    <OnboardingStyles.Section>
      <ToggleRow label={t(ONBOARDING_CONSTANTS.OVERLAY.TOGGLE)} value={!!overlayEnabled} onValueChange={changeOverlay} />
      <OnboardingStyles.Note>{t(ONBOARDING_CONSTANTS.OVERLAY.PERMISSION_NOTE)}</OnboardingStyles.Note>
      <PermissionStep
        title={t(ONBOARDING_CONSTANTS.OVERLAY.OPEN_PERMISSION)}
        granted={!!permissions?.overlay}
        statusLabel={statusLabel(!!permissions?.overlay)}
        actionLabel={t(COMMON_CONSTANTS.ACTIONS.OPEN)}
        onAction={() => openPermission('overlay')}
      />
    </OnboardingStyles.Section>
  );

  const renderStepContent = () => {
    switch (step) {
      case STEPS.PRIVACY:
        return renderPrivacy();
      case STEPS.ACCESSIBILITY:
        return renderAccessibility();
      case STEPS.OVERLAY:
        return renderOverlay();
      case STEPS.BATTERY:
        return (
          <PermissionStep
            title={t(SETTINGS_CONSTANTS.BATTERY)}
            granted={!!permissions?.battery}
            statusLabel={statusLabel(!!permissions?.battery)}
            actionLabel={t(ONBOARDING_CONSTANTS.BATTERY.OPEN)}
            onAction={() => openPermission('battery')}
          />
        );
      case STEPS.LIMIT:
        return (
          <Stepper
            label={t(SETTINGS_CONSTANTS.LIMIT)}
            valueLabel={t(ONBOARDING_CONSTANTS.LIMIT.VALUE, { value: dailyLimit })}
            value={dailyLimit ?? TRACKER_CONSTANTS.LIMIT.DEFAULT}
            min={TRACKER_CONSTANTS.LIMIT.MIN}
            max={TRACKER_CONSTANTS.LIMIT.MAX}
            step={TRACKER_CONSTANTS.LIMIT.STEP}
            onChange={changeLimit}
          />
        );
      case STEPS.IOS:
        return (
          <ComingSoonCard
            title={t(SETTINGS_CONSTANTS.IOS_TITLE)}
            body={t(TRACKER_CONSTANTS.REASONS['ios-family-controls-entitlement-required'])}
            badge={t(TRACKER_CONSTANTS.STATUS.COMING_SOON)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer withBottomInset>
      <OnboardingStep
        image={ONBOARDING_IMAGES[step]}
        stepLabel={t(ONBOARDING_CONSTANTS.STEP, { current: stepIndex + 1, total: steps.length })}
        title={t(COPY[step].TITLE)}
        body={COPY[step].BODY ? t(COPY[step].BODY) : undefined}
      >
        {renderStepContent()}
      </OnboardingStep>
      <OnboardingStyles.Actions>
        {stepIndex > 0 ? (
          <OnboardingStyles.ActionSlot $grow={false}>
            <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.BACK)} onPress={handleBack} variant="ghost" />
          </OnboardingStyles.ActionSlot>
        ) : null}
        <OnboardingStyles.ActionSlot $grow>
          <PrimaryButton
            label={t(isLast ? COMMON_CONSTANTS.ACTIONS.ARISE : COMMON_CONSTANTS.ACTIONS.CONTINUE)}
            onPress={handleNext}
            variant={isLast ? 'danger' : 'primary'}
          />
        </OnboardingStyles.ActionSlot>
      </OnboardingStyles.Actions>
    </PageContainer>
  );
};

export default Onboarding;
