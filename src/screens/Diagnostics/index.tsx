import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import InfoRow from '../../components/InfoRow';
import PrimaryButton from '../../components/PrimaryButton';
import EmptyState from '../../components/EmptyState';
import { DiagnosticsStyles } from './styles';
import type { AppDiagnostics, DiagnosticLogEntry, EngineDiagnostics } from '../../types';
import { DIAGNOSTICS_CONSTANTS } from '../../constants/screens';
import { COMMON_CONSTANTS } from '../../constants/common';
import { SCREEN_IMAGES } from '../../constants/images';
import { useDiagnostics } from '../../hooks/useDiagnostics';
import { formatDateTime, formatTime } from '../../utils/date';
import { appLabel, appShortLabel } from '../../utils/format';

type Props = RootScreenProps<'Diagnostics'>;

const Diagnostics = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { diagnostics, loading, reload, clear } = useDiagnostics();

  const engine = diagnostics?.engine;
  const recent = diagnostics?.recent?.slice(0, DIAGNOSTICS_CONSTANTS.RECENT_VISIBLE) ?? [];
  const yesNo = (value: boolean) => t(value ? DIAGNOSTICS_CONSTANTS.YES : DIAGNOSTICS_CONSTANTS.NO);
  const timeOrNever = (timestamp: number) =>
    timestamp > 0 ? formatDateTime(timestamp) : t(DIAGNOSTICS_CONSTANTS.NEVER);

  const renderApp = (app: AppDiagnostics) => (
    <SystemPanel
      key={app?.id}
      title={appLabel(app?.id, t).toUpperCase()}
      rightLabel={app?.experimental ? t(COMMON_CONSTANTS.EXPERIMENTAL) : undefined}
      variant={app?.experimental ? 'monarch' : 'system'}
    >
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.APP_VERSION)} value={app?.versionName ?? t(COMMON_CONSTANTS.DASH)} />
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.DETECTOR)} value={app?.detectorVersion ?? t(COMMON_CONSTANTS.DASH)} />
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.EVENTS)} value={`${app?.eventsSeen ?? 0}`} />
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.INSPECTIONS)} value={`${app?.inspections ?? 0}`} />
      <InfoRow
        label={t(DIAGNOSTICS_CONSTANTS.DETECTIONS)}
        value={t(DIAGNOSTICS_CONSTANTS.DETECTIONS_VALUE, {
          high: app?.detectionsHigh ?? 0,
          medium: app?.detectionsMedium ?? 0,
          low: app?.detectionsLow ?? 0,
          none: app?.detectionsNone ?? 0,
        })}
      />
      <InfoRow
        label={t(DIAGNOSTICS_CONSTANTS.LAST_STATE)}
        value={t(DIAGNOSTICS_CONSTANTS.STATE_VALUE, {
          state: app?.lastState ?? t(COMMON_CONSTANTS.DASH),
          confidence: app?.lastConfidence ?? t(COMMON_CONSTANTS.DASH),
        })}
      />
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.LAST_SIGNALS)} value={app?.lastSignals || t(COMMON_CONSTANTS.DASH)} />
      <InfoRow
        label={t(DIAGNOSTICS_CONSTANTS.LAST_INSPECTION)}
        value={t(DIAGNOSTICS_CONSTANTS.INSPECTION_VALUE, {
          nodes: app?.lastInspectionNodes ?? 0,
          ms: app?.lastInspectionMs ?? 0,
        })}
      />
      <InfoRow label={t(DIAGNOSTICS_CONSTANTS.LAST_COUNTED)} value={timeOrNever(app?.lastCountedAt ?? 0)} />
    </SystemPanel>
  );

  return (
    <PageContainer withBottomInset>
      <ScreenHeader
        title={t(DIAGNOSTICS_CONSTANTS.TITLE)}
        subtitle={t(DIAGNOSTICS_CONSTANTS.SUBTITLE)}
        onBack={navigation.goBack}
        backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
      />
      <SystemPanel title={t(DIAGNOSTICS_CONSTANTS.SERVICE)} variant="danger">
        <DiagnosticsStyles.Note>{t(DIAGNOSTICS_CONSTANTS.PENDING_NOTE)}</DiagnosticsStyles.Note>
        <InfoRow
          label={t(DIAGNOSTICS_CONSTANTS.VALIDATION)}
          value={t(COMMON_CONSTANTS.VALIDATION[diagnostics?.validationStatus ?? 'pendingDeviceValidation'])}
          emphasis="danger"
        />
        <InfoRow
          label={t(DIAGNOSTICS_CONSTANTS.SERVICE)}
          value={t(diagnostics?.serviceConnected ? DIAGNOSTICS_CONSTANTS.CONNECTED : DIAGNOSTICS_CONSTANTS.DISCONNECTED)}
          emphasis={diagnostics?.serviceConnected ? 'system' : 'danger'}
        />
      </SystemPanel>
      <SystemPanel title={t(DIAGNOSTICS_CONSTANTS.ENGINE)}>
        <InfoRow label={t(DIAGNOSTICS_CONSTANTS.CURRENT_APP)} value={appLabel(engine?.app, t)} />
        <InfoRow label={t(DIAGNOSTICS_CONSTANTS.IN_FEED)} value={yesNo(!!engine?.inFeed)} />
        <InfoRow label={t(DIAGNOSTICS_CONSTANTS.IDLE)} value={yesNo(!!engine?.idle)} />
        <InfoRow label={t(DIAGNOSTICS_CONSTANTS.CONFIDENCE)} value={engine?.feedConfidence ?? t(COMMON_CONSTANTS.DASH)} />
        {DIAGNOSTICS_CONSTANTS.ENGINE_COUNTERS.map((counter: (typeof DIAGNOSTICS_CONSTANTS.ENGINE_COUNTERS)[number]) => (
          <InfoRow
            key={counter.key}
            label={t(counter.labelKey)}
            value={`${engine?.[counter.key as keyof EngineDiagnostics] ?? 0}`}
          />
        ))}
      </SystemPanel>
      {diagnostics?.apps?.map(renderApp)}
      <SystemPanel title={t(DIAGNOSTICS_CONSTANTS.RECENT)} variant="monarch">
        {recent.length === 0 ? (
          <EmptyState image={SCREEN_IMAGES.DIAGNOSTICS_BANNER} message={t(DIAGNOSTICS_CONSTANTS.EMPTY)} />
        ) : null}
        {recent.map((entry: DiagnosticLogEntry) => (
          <DiagnosticsStyles.LogItem key={`${entry?.ts}-${entry?.kind}-${entry?.detail}`}>
            <DiagnosticsStyles.LogHeader>
              {t(DIAGNOSTICS_CONSTANTS.LOG_HEADER, {
                time: formatTime(entry?.ts),
                app: appShortLabel(entry?.app, t),
                kind: entry?.kind,
              })}
            </DiagnosticsStyles.LogHeader>
            {entry?.detail ? <DiagnosticsStyles.LogDetail>{entry.detail}</DiagnosticsStyles.LogDetail> : null}
          </DiagnosticsStyles.LogItem>
        ))}
      </SystemPanel>
      <DiagnosticsStyles.Actions>
        <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.REFRESH)} onPress={reload} loading={loading} compact />
        <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.CLEAR)} onPress={clear} variant="danger" compact />
      </DiagnosticsStyles.Actions>
    </PageContainer>
  );
};

export default Diagnostics;
