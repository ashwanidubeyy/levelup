import React, { createContext, useContext, useMemo, useState } from 'react';

export type TrackerDestination = 'Home' | 'Stats' | 'Calendar';

export type ToolsDestination =
  | 'Journal'
  | 'Notes'
  | 'Motivation'
  | 'Focus'
  | 'Planner'
  | 'Budget'
  | 'Calculator'
  | 'Challenges';

interface ShellValue {
  trackerScreen: TrackerDestination;
  toolsScreen: ToolsDestination;
  openTracker: (screen: TrackerDestination) => void;
  openTools: (screen: ToolsDestination) => void;
}

const FALLBACK_SHELL: ShellValue = {
  trackerScreen: 'Home',
  toolsScreen: 'Journal',
  openTracker: () => undefined,
  openTools: () => undefined,
};

const ShellContext = createContext<ShellValue>(FALLBACK_SHELL);

export const ShellProvider = ({ children }: { children: React.ReactNode }) => {
  const [trackerScreen, setTrackerScreen] = useState<TrackerDestination>('Home');
  const [toolsScreen, setToolsScreen] = useState<ToolsDestination>('Journal');
  const value = useMemo(
    () => ({
      trackerScreen,
      toolsScreen,
      openTracker: setTrackerScreen,
      openTools: setToolsScreen,
    }),
    [trackerScreen, toolsScreen],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
};

export const useShell = (): ShellValue => useContext(ShellContext);
