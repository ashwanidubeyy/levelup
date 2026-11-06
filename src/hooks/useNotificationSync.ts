import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { buildNotificationPlan } from '../utils/notificationPlan';
import notificationService from '../services/notification.service';

export const useNotificationSync = () => {
  const hydrated = useAppSelector(state => state?.settings?.hydrated);
  const challenges = useAppSelector(state => state?.challenges?.items);
  const reminders = useAppSelector(state => state?.reminders?.items);
  const budget = useAppSelector(state => state?.budget);

  useEffect(() => {
    if (!hydrated || !budget) {
      return;
    }
    const plan = buildNotificationPlan(challenges ?? [], reminders ?? [], budget, Date.now());
    notificationService.sync(plan).catch(() => undefined);
  }, [hydrated, challenges, reminders, budget]);
};
