import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import AnimeHeroCard from '../../components/AnimeHeroCard';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import ToggleRow from '../../components/ToggleRow';
import Stepper from '../../components/Stepper';
import SegmentedControl from '../../components/SegmentedControl';
import PermissionStep from '../../components/PermissionStep';
import NavRow from '../../components/NavRow';
import ComingSoonCard from '../../components/ComingSoonCard';
import { SettingsStyles } from './styles';
import type { SegmentOption, SupportedApp } from '../../types';
import { SETTINGS_CONSTANTS } from '../../constants/screens';
import { TRACKING_SNOOZE_CONSTANTS, TRACKING_SNOOZE_RULES } from '../../constants/trackingSnooze';
import { COMMON_CONSTANTS } from '../../constants/common';
import { TRACKER_CONSTANTS } from '../../constants/tracker';
import { SCREEN_IMAGES } from '../../constants/images';
import { useAppSelector } from '../../store';
import { useTrackerState } from '../../hooks/useTrackerState';
import { useSettingsActions } from '../../hooks/useSettingsActions';
import { appLabel, formatDuration } from '../../utils/format';
import { isTrackingSnoozed, trackingSnoozeLabelMs } from '../../utils/trackingSnooze';
import { TIME } from '../../constants/common';
import { THEME_CONSTANTS, THEME_OPTIONS } from '../../constants/theme';
import { useAppDispatch } from '../../store';
import { setThemeId } from '../../store/slices/settingsSlice';
import type { ThemeId } from '../../theme/types';

type Props = RootScreenProps<'Settings'>;

const Settings = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector(state => state?.settings);
  const { capabilities, status } = useTrackerState();
  const actions = useSettingsActions();
  const now = Date.now();
  const snoozed = isTrackingSnoozed(settings, now);
  const snoozeRemaining = trackingSnoozeLabelMs(settings, now);

  const isIos = status === 'comingSoon';
  const permissions = capabilities?.permissions;
  const grantedLabel = (granted: boolean) => t(granted ? SETTINGS_CONSTANTS.GRANTED : SETTINGS_CONSTANTS.MISSING);

  const dwellOptions: SegmentOption[] = TRACKER_CONSTANTS.DWELL_OPTIONS.map(
    (option: (typeof TRACKER_CONSTANTS.DWELL_OPTIONS)[number]) => ({ label: t(option.labelKey), value: `${option.value}` }),
  );

  const appHint = (app: SupportedApp) => {
    if (!app?.installed) {
      return t(SETTINGS_CONSTANTS.NOT_INSTALLED);
    }
    const version = app?.versionName ? t(SETTINGS_CONSTANTS.VERSION, { version: app.versionName }) : '';
    return app?.experimental
      ? t(SETTINGS_CONSTANTS.VERSION_TAGGED, { version, tag: t(COMMON_CONSTANTS.EXPERIMENTAL) })
      : version;
  };

  const renderTracking = () => (
    <SystemPanel title={t(SETTINGS_CONSTANTS.TRACKING)}>
      <ToggleRow
        label={t(SETTINGS_CONSTANTS.TRACKING_ENABLED)}
        hint={t(SETTINGS_CONSTANTS.TRACKING_HINT)}
        value={!!settings?.trackingEnabled}
        onValueChange={actions.changeTracking}
      />
      <ToggleRow
        label={t(SETTINGS_CONSTANTS.OVERLAY_ENABLED)}
        hint={t(SETTINGS_CONSTANTS.OVERLAY_HINT)}
        value={!!settings?.overlayEnabled}
        onValueChange={actions.changeOverlay}
      />
      <Stepper
        label={t(SETTINGS_CONSTANTS.LIMIT)}
        valueLabel={t(SETTINGS_CONSTANTS.LIMIT_VALUE, { value: settings?.dailyLimit })}
        value={settings?.dailyLimit ?? TRACKER_CONSTANTS.LIMIT.DEFAULT}
        min={TRACKER_CONSTANTS.LIMIT.MIN}
        max={TRACKER_CONSTANTS.LIMIT.MAX}
        step={TRACKER_CONSTANTS.LIMIT.STEP}
        onChange={actions.changeLimit}
      />
      <SettingsStyles.FieldLabel>{t(SETTINGS_CONSTANTS.DWELL)}</SettingsStyles.FieldLabel>
      <SettingsStyles.Hint>{t(SETTINGS_CONSTANTS.DWELL_HINT)}</SettingsStyles.Hint>
      <SegmentedControl
        options={dwellOptions}
        value={`${settings?.dwellMs ?? TRACKER_CONSTANTS.DWELL_DEFAULT}`}
        onChange={(value: string) => actions.changeDwell(Number(value))}
      />
      <ToggleRow
        label={t(SETTINGS_CONSTANTS.LOW_CONFIDENCE)}
        hint={t(SETTINGS_CONSTANTS.LOW_CONFIDENCE_HINT)}
        value={!!settings?.allowLowConfidence}
        onValueChange={actions.changeLowConfidence}
      />
    </SystemPanel>
  );

  const handleSnooze = (minutes: number) => {
    actions.snoozeTracking(now + minutes * TIME.MINUTE_MS);
  };

  const handleSnoozeUntilMidnight = () => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    actions.snoozeTracking(end.getTime());
  };

  const renderTheme = () => (
    <SystemPanel title={t(THEME_CONSTANTS.TITLE)} variant="monarch">
      <SettingsStyles.Hint>{t(THEME_CONSTANTS.HINT)}</SettingsStyles.Hint>
      {THEME_OPTIONS.map((option: (typeof THEME_OPTIONS)[number]) => {
        const active = settings?.themeId === option.id;
        return (
          <NavRow
            key={option.id}
            label={t(option.labelKey)}
            hint={active ? t(COMMON_CONSTANTS.ON) : t(option.hintKey)}
            onPress={() => dispatch(setThemeId(option.id as ThemeId))}
          />
        );
      })}
    </SystemPanel>
  );

  const renderSnooze = () => (
    <SystemPanel title={t(TRACKING_SNOOZE_CONSTANTS.TITLE)} variant="system">
      <SettingsStyles.Hint>{t(TRACKING_SNOOZE_CONSTANTS.HINT)}</SettingsStyles.Hint>
      {snoozed ? (
        <SettingsStyles.Paragraph>
          {t(TRACKING_SNOOZE_CONSTANTS.ACTIVE, {
            time: formatDuration(snoozeRemaining, t),
          })}
        </SettingsStyles.Paragraph>
      ) : null}
      {TRACKING_SNOOZE_RULES.MINUTES.map((minutes: number) => (
        <NavRow
          key={`snooze-${minutes}`}
          label={t(TRACKING_SNOOZE_CONSTANTS.OPTION, { minutes })}
          onPress={() => handleSnooze(minutes)}
        />
      ))}
      <NavRow label={t(TRACKING_SNOOZE_CONSTANTS.UNTIL_MIDNIGHT)} onPress={handleSnoozeUntilMidnight} />
      {snoozed ? <NavRow label={t(TRACKING_SNOOZE_CONSTANTS.CLEAR)} onPress={actions.endSnooze} /> : null}
    </SystemPanel>
  );

  const renderApps = () => (
    <SystemPanel title={t(SETTINGS_CONSTANTS.APPS)} variant="monarch">
      {capabilities?.apps?.map((app: SupportedApp) => (
        <ToggleRow
          key={app?.id}
          label={appLabel(app?.id, t)}
          hint={appHint(app)}
          value={settings?.appsEnabled?.[app?.id] !== false}
          onValueChange={(enabled: boolean) => actions.changeApp(app?.id, enabled)}
        />
      ))}
    </SystemPanel>
  );

  const renderPermissions = () => (
    <SystemPanel title={t(SETTINGS_CONSTANTS.PERMISSIONS)} variant="danger">
      <PermissionStep
        title={t(SETTINGS_CONSTANTS.ACCESSIBILITY)}
        granted={!!permissions?.accessibility}
        statusLabel={grantedLabel(!!permissions?.accessibility)}
        actionLabel={t(COMMON_CONSTANTS.ACTIONS.OPEN)}
        onAction={() => actions.openPermission('accessibility')}
      />
      {capabilities?.restrictedSettingsLikely ? (
        <PermissionStep
          title={t(SETTINGS_CONSTANTS.RESTRICTED)}
          description={t(SETTINGS_CONSTANTS.RESTRICTED_HINT)}
          granted={!!permissions?.accessibility}
          statusLabel={grantedLabel(!!permissions?.accessibility)}
          actionLabel={t(COMMON_CONSTANTS.ACTIONS.OPEN)}
          onAction={() => actions.openPermission('appDetails')}
        />
      ) : null}
      <PermissionStep
        title={t(SETTINGS_CONSTANTS.OVERLAY)}
        granted={!!permissions?.overlay}
        statusLabel={grantedLabel(!!permissions?.overlay)}
        actionLabel={t(COMMON_CONSTANTS.ACTIONS.OPEN)}
        onAction={() => actions.openPermission('overlay')}
      />
      <PermissionStep
        title={t(SETTINGS_CONSTANTS.BATTERY)}
        granted={!!permissions?.battery}
        statusLabel={grantedLabel(!!permissions?.battery)}
        actionLabel={t(COMMON_CONSTANTS.ACTIONS.OPEN)}
        onAction={() => actions.openPermission('battery')}
      />
    </SystemPanel>
  );

  return (
    <PageContainer>
      <AnimeHeroCard image={SCREEN_IMAGES.SETTINGS_BANNER} size="short">
        <ScreenHeader
          title={t(SETTINGS_CONSTANTS.TITLE)}
          subtitle={t(SETTINGS_CONSTANTS.SUBTITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
        />
      </AnimeHeroCard>
      {isIos ? (
        <ComingSoonCard
          title={t(SETTINGS_CONSTANTS.IOS_TITLE)}
          body={t(SETTINGS_CONSTANTS.IOS_BODY)}
          badge={t(TRACKER_CONSTANTS.STATUS.COMING_SOON)}
        />
      ) : null}
      {renderTheme()}
      {!isIos ? renderTracking() : null}
      {!isIos ? renderSnooze() : null}
      {!isIos ? renderApps() : null}
      {!isIos ? renderPermissions() : null}
      <SystemPanel title={t(SETTINGS_CONSTANTS.PRIVACY)}>
        <SettingsStyles.Paragraph>{t(SETTINGS_CONSTANTS.PRIVACY_BODY)}</SettingsStyles.Paragraph>
      </SystemPanel>
      <SystemPanel title={t(SETTINGS_CONSTANTS.TOOLS)}>
        {!isIos ? (
          <NavRow
            label={t(SETTINGS_CONSTANTS.DIAGNOSTICS)}
            hint={t(SETTINGS_CONSTANTS.DIAGNOSTICS_HINT)}
            onPress={() => navigation.navigate('Diagnostics')}
          />
        ) : null}
        <NavRow label={t(SETTINGS_CONSTANTS.RERUN_ONBOARDING)} onPress={() => navigation.navigate('Onboarding')} />
      </SystemPanel>
    </PageContainer>
  );
};

export default Settings;
