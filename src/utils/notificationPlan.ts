import type { Challenge, Expense, Reminder } from '../types';
import { NOTIFICATION_CHANNELS, NOTIFICATION_CONSTANTS, NOTIFICATION_RULES } from '../constants/notifications';
import { addDays, compareDayKeys, dayOfYear, formatClock, parseDayKey, timestampFor, todayKey, upcomingDays } from './date';
import { challengeEndDay, isDayInChallenge } from './challenges';
import { expensesForDay } from './money';
import { previewText, quoteAt } from './helpers';
import i18n from '../i18n';

export interface BudgetPlanInput {
  nightReminderEnabled: boolean;
  nightHour: number;
  nightMinute: number;
  expenses: Expense[];
}

export interface PlannedNotification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  channelId: string;
  repeatDaily: boolean;
}

const FUTURE_BUFFER_MS = 1500;

const quoteForDay = (day: string) => quoteAt(dayOfYear(parseDayKey(day)));

export const nextDailyTimestamp = (startDay: string, hour: number, minute: number, now: number): number => {
  const today = todayKey();
  const firstDay = compareDayKeys(startDay, today) > 0 ? startDay : today;
  const at = timestampFor(firstDay, hour, minute);
  return at > now ? at : timestampFor(addDays(firstDay, 1), hour, minute);
};

const pushFuture = (items: PlannedNotification[], item: PlannedNotification, now: number) => {
  if (item.timestamp > now + FUTURE_BUFFER_MS) {
    items.push(item);
  }
};

export const buildNotificationPlan = (
  challenges: Challenge[],
  reminders: Reminder[],
  budget: BudgetPlanInput,
  now: number,
): PlannedNotification[] => {
  const items: PlannedNotification[] = [];
  const quoteTitle = i18n.t(NOTIFICATION_CONSTANTS.QUOTE_TITLE);

  upcomingDays(NOTIFICATION_RULES.WINDOW_DAYS).forEach((day: string) => {
    const quote = quoteForDay(day);
    pushFuture(
      items,
      {
        id: `${NOTIFICATION_RULES.QUOTE_PREFIX}${day}`,
        title: quoteTitle,
        body: previewText(`${i18n.t(quote.textKey)} — ${i18n.t(quote.authorKey)}`, 180),
        timestamp: timestampFor(day, NOTIFICATION_RULES.QUOTE_HOUR, NOTIFICATION_RULES.QUOTE_MINUTE),
        channelId: NOTIFICATION_CHANNELS.QUOTES,
        repeatDaily: false,
      },
      now,
    );
  });

  reminders?.forEach((reminder: Reminder) => {
    const timestamp =
      reminder?.repeat === 'daily'
        ? nextDailyTimestamp(reminder.day, reminder.hour, reminder.minute, now)
        : timestampFor(reminder.day, reminder.hour, reminder.minute);
    pushFuture(
      items,
      {
        id: `${NOTIFICATION_RULES.REMINDER_PREFIX}${reminder?.id}`,
        title: reminder?.title ?? '',
        body: formatClock(reminder?.hour ?? 0, reminder?.minute ?? 0),
        timestamp,
        channelId: NOTIFICATION_CHANNELS.REMINDERS,
        repeatDaily: reminder?.repeat === 'daily',
      },
      now,
    );
  });

  challenges?.forEach((challenge: Challenge) => {
    if (!challenge?.reminderEnabled || challenge?.completedAt) {
      return;
    }
    const end = challengeEndDay(challenge);
    upcomingDays(NOTIFICATION_RULES.WINDOW_DAYS).forEach((day: string) => {
      if (!isDayInChallenge(challenge, day) || compareDayKeys(day, end) > 0) {
        return;
      }
      pushFuture(
        items,
        {
          id: `${NOTIFICATION_RULES.CHALLENGE_PREFIX}${challenge.id}-${day}`,
          title: i18n.t(NOTIFICATION_CONSTANTS.CHALLENGE_TITLE),
          body: i18n.t(NOTIFICATION_CONSTANTS.CHALLENGE_BODY, { title: challenge.title }),
          timestamp: timestampFor(day, challenge.reminderHour, challenge.reminderMinute),
          channelId: NOTIFICATION_CHANNELS.CHALLENGES,
          repeatDaily: false,
        },
        now,
      );
    });
  });

  if (budget?.nightReminderEnabled) {
    upcomingDays(NOTIFICATION_RULES.BUDGET_WINDOW_DAYS).forEach((day: string) => {
      const logged = expensesForDay(budget?.expenses ?? [], day).length > 0;
      if (logged) {
        return;
      }
      pushFuture(
        items,
        {
          id: `${NOTIFICATION_RULES.BUDGET_PREFIX}${day}`,
          title: i18n.t(NOTIFICATION_CONSTANTS.BUDGET_TITLE),
          body: i18n.t(NOTIFICATION_CONSTANTS.BUDGET_BODY),
          timestamp: timestampFor(day, budget?.nightHour ?? 21, budget?.nightMinute ?? 0),
          channelId: NOTIFICATION_CHANNELS.BUDGET,
          repeatDaily: false,
        },
        now,
      );
    });
  }

  return items;
};
