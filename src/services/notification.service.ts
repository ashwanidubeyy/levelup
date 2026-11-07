import notifee, {
  AlarmType,
  AndroidImportance,
  RepeatFrequency,
  TriggerType,
  type TimestampTrigger,
} from '@notifee/react-native';
import { NOTIFICATION_CHANNELS, NOTIFICATION_CONSTANTS, NOTIFICATION_RULES } from '../constants/notifications';
import type { PlannedNotification } from '../utils/notificationPlan';
import i18n from '../i18n';

const MANAGED_PREFIXES = [
  NOTIFICATION_RULES.QUOTE_PREFIX,
  NOTIFICATION_RULES.REMINDER_PREFIX,
  NOTIFICATION_RULES.CHALLENGE_PREFIX,
  NOTIFICATION_RULES.BUDGET_PREFIX,
  NOTIFICATION_RULES.PLANNER_PREFIX,
];

const CHANNELS = [
  { id: NOTIFICATION_CHANNELS.QUOTES, nameKey: NOTIFICATION_CONSTANTS.QUOTE_CHANNEL },
  { id: NOTIFICATION_CHANNELS.REMINDERS, nameKey: NOTIFICATION_CONSTANTS.REMINDER_CHANNEL },
  { id: NOTIFICATION_CHANNELS.BUDGET, nameKey: NOTIFICATION_CONSTANTS.BUDGET_CHANNEL },
  { id: NOTIFICATION_CHANNELS.FOCUS, nameKey: NOTIFICATION_CONSTANTS.FOCUS_CHANNEL },
  { id: NOTIFICATION_CHANNELS.CHALLENGES, nameKey: NOTIFICATION_CONSTANTS.CHALLENGE_CHANNEL },
  { id: NOTIFICATION_CHANNELS.PLANNER, nameKey: NOTIFICATION_CONSTANTS.PLANNER_CHANNEL },
];

const ensureChannels = (): Promise<void> => {
  const created: Promise<string>[] = [];
  CHANNELS.forEach(channel => {
    created.push(
      notifee.createChannel({
        id: channel.id,
        name: i18n.t(channel.nameKey),
        importance: AndroidImportance.HIGH,
      }),
    );
  });
  return Promise.all(created).then(() => undefined);
};

const triggerFor = (item: PlannedNotification): TimestampTrigger => ({
  type: TriggerType.TIMESTAMP,
  timestamp: item.timestamp,
  repeatFrequency: item.repeatDaily ? RepeatFrequency.DAILY : undefined,
  alarmManager: { type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE },
});

const displayFor = (item: PlannedNotification) => ({
  id: item.id,
  title: item.title,
  body: item.body,
  android: {
    channelId: item.channelId,
    pressAction: { id: 'default' },
  },
});

const clearManaged = (): Promise<void> =>
  notifee.getTriggerNotificationIds().then((ids: string[]) => {
    const managed = ids?.filter((id: string) => MANAGED_PREFIXES.some((prefix: string) => id?.startsWith(prefix))) ?? [];
    return managed.length > 0 ? notifee.cancelTriggerNotifications(managed) : undefined;
  });

const scheduleOne = (item: PlannedNotification): Promise<string> =>
  notifee.createTriggerNotification(displayFor(item), triggerFor(item)).catch(() =>
    notifee.createTriggerNotification(displayFor(item), {
      type: TriggerType.TIMESTAMP,
      timestamp: item.timestamp,
      repeatFrequency: item.repeatDaily ? RepeatFrequency.DAILY : undefined,
    }),
  );

const sync = (items: PlannedNotification[]): Promise<void> =>
  notifee
    .requestPermission()
    .then(() => ensureChannels())
    .then(() => clearManaged())
    .then(() => {
      const tasks: Promise<string>[] = [];
      items?.forEach((item: PlannedNotification) => {
        tasks.push(scheduleOne(item).catch(() => ''));
      });
      return Promise.all(tasks);
    })
    .then(() => undefined)
    .catch(() => undefined);

const scheduleFocusEnd = (timestamp: number, title: string, body: string): Promise<void> =>
  ensureChannels()
    .then(() =>
      notifee.createTriggerNotification(
        {
          id: NOTIFICATION_RULES.FOCUS_ID,
          title,
          body,
          android: {
            channelId: NOTIFICATION_CHANNELS.FOCUS,
            pressAction: { id: 'default' },
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp,
          alarmManager: { type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE },
        },
      ),
    )
    .then(() => undefined)
    .catch(() => undefined);

const cancelFocusEnd = (): Promise<void> =>
  notifee
    .cancelTriggerNotification(NOTIFICATION_RULES.FOCUS_ID)
    .then(() => undefined)
    .catch(() => undefined);

const notificationService = { sync, scheduleFocusEnd, cancelFocusEnd };

export default notificationService;
