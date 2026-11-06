import { useAppSelector } from '../store';
import trackerService from '../services/tracker.service';

export const useTrackerState = () => {
  const capabilities = useAppSelector(state => state?.tracker?.capabilities);
  const today = useAppSelector(state => state?.tracker?.today);
  const todayUsage = useAppSelector(state => state?.tracker?.todayUsage);
  const live = useAppSelector(state => state?.tracker?.live);

  return {
    capabilities,
    today,
    todayUsage,
    live,
    status: trackerService.statusFromCapabilities(capabilities),
  };
};
