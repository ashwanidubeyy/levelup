import { useCallback, useEffect } from 'react';
import { useAppSelector } from '../store';
import { buildNotificationPlan } from '../utils/notificationPlan';
import notificationService from '../services/notification.service';
import { useAppActive } from './useAppActive';

export const useNotificationSync = () => {
  const hydrated = useAppSelector(state => state?.settings?.hydrated);
  const challenges = useAppSelector(state => state?.challenges?.items);
  const reminders = useAppSelector(state => state?.reminders?.items);
  const budget = useAppSelector(state => state?.budget);
  const todos = useAppSelector(state => state?.todos);

  const syncNotifications = useCallback(() => {
    if (!hydrated || !budget) {
      return;
    }
    const plan = buildNotificationPlan(
      challenges ?? [],
      reminders ?? [],
      budget,
      {
        reminderEnabled: todos?.reminderEnabled ?? true,
        reminderHour: todos?.reminderHour ?? 21,
        reminderMinute: todos?.reminderMinute ?? 0,
        items: todos?.items ?? [],
      },
      Date.now(),
    );
    notificationService.sync(plan).catch(() => undefined);
  }, [hydrated, challenges, reminders, budget, todos]);

  useEffect(() => {
    const timer = setTimeout(() => {
      syncNotifications();
    }, 0);
    return () => clearTimeout(timer);
  }, [syncNotifications]);

  useAppActive(() => {
    syncNotifications();
  });
};
