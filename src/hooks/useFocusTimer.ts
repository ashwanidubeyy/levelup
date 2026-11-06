import { useEffect, useRef, useState } from 'react';
import { FOCUS_RULES } from '../constants/focus';
import { TIME } from '../constants/common';
import { useAppDispatch, useAppSelector } from '../store';
import { addFocusLog, clearActiveFocus, setActiveFocus } from '../store/slices/focusSlice';
import notificationService from '../services/notification.service';
import { todayKey } from '../utils/date';
import { generateId } from '../utils/helpers';
import type { FocusLog } from '../types';

const presetFor = (value: number): string => {
  if (value === Number(FOCUS_RULES.PRESET_25)) {
    return FOCUS_RULES.PRESET_25;
  }
  if (value === Number(FOCUS_RULES.PRESET_45)) {
    return FOCUS_RULES.PRESET_45;
  }
  if (value === Number(FOCUS_RULES.PRESET_60)) {
    return FOCUS_RULES.PRESET_60;
  }
  return FOCUS_RULES.CUSTOM;
};

export const useFocusTimer = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector(state => state?.focus?.active ?? null);
  const logs = useAppSelector(state => state?.focus?.logs) ?? [];
  const [minutes, setMinutes] = useState(active?.minutes ?? FOCUS_RULES.DEFAULT_MINUTES);
  const [preset, setPreset] = useState(presetFor(active?.minutes ?? FOCUS_RULES.DEFAULT_MINUTES));
  const [pausedMs, setPausedMs] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const finishing = useRef(false);

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const timer = setInterval(() => setNow(Date.now()), TIME.SECOND_MS);
    return () => clearInterval(timer);
  }, [active]);

  useEffect(() => {
    if (!active || now < active.endsAt || finishing.current) {
      return;
    }
    finishing.current = true;
    const day = todayKey();
    dispatch(
      addFocusLog({
        id: generateId(),
        day,
        minutes: active.minutes,
        completedAt: Date.now(),
      }),
    );
    dispatch(clearActiveFocus());
    notificationService.cancelFocusEnd().catch(() => undefined);
  }, [active, dispatch, now]);

  const remainingMs = active ? Math.max(0, active.endsAt - now) : pausedMs ?? minutes * TIME.MINUTE_MS;
  const running = !!active && remainingMs > 0;
  const todayCount = logs?.filter((log: FocusLog) => log?.day === todayKey()).length ?? 0;

  const handlePreset = (value: string) => {
    if (running) {
      return;
    }
    setPausedMs(null);
    setPreset(value);
    if (value !== FOCUS_RULES.CUSTOM) {
      setMinutes(Number(value));
    }
  };

  const handleMinutes = (value: number) => {
    if (running) {
      return;
    }
    setPausedMs(null);
    setPreset(FOCUS_RULES.CUSTOM);
    setMinutes(value);
  };

  const handleStart = () => {
    if (running) {
      return;
    }
    const duration = pausedMs ?? minutes * TIME.MINUTE_MS;
    const endsAt = Date.now() + duration;
    finishing.current = false;
    setPausedMs(null);
    dispatch(setActiveFocus({ endsAt, minutes }));
  };

  const handlePause = () => {
    if (!active) {
      return;
    }
    setPausedMs(Math.max(0, active.endsAt - Date.now()));
    dispatch(clearActiveFocus());
    notificationService.cancelFocusEnd().catch(() => undefined);
  };

  const handleReset = () => {
    setPausedMs(null);
    setMinutes(FOCUS_RULES.DEFAULT_MINUTES);
    setPreset(FOCUS_RULES.PRESET_25);
    dispatch(clearActiveFocus());
    notificationService.cancelFocusEnd().catch(() => undefined);
  };

  return {
    minutes,
    preset,
    remainingMs,
    running,
    paused: pausedMs !== null && !running,
    todayCount,
    handlePreset,
    handleMinutes,
    handleStart,
    handlePause,
    handleReset,
  };
};
