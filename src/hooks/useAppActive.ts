import { useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export const useAppActive = (onActive: () => void) => {
  const callbackRef = useRef(onActive);

  useEffect(() => {
    callbackRef.current = onActive;
  }, [onActive]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (status === 'active') {
        callbackRef.current();
      }
    });
    return () => subscription.remove();
  }, []);
};
