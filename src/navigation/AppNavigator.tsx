import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  type CompositeScreenProps,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackNavigationProp, type NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateVerticalScale } from 'react-native-size-matters';
import TabBar from '../components/TabBar';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import Focus from '../screens/Focus';
import Journal from '../screens/Journal';
import Notes from '../screens/Notes';
import Motivation from '../screens/Motivation';
import Budget from '../screens/Budget';
import Calculator from '../screens/Calculator';
import Challenges from '../screens/Challenges';
import Stats from '../screens/Stats';
import Calendar from '../screens/Calendar';
import JournalEditor from '../screens/JournalEditor';
import NoteEditor from '../screens/NoteEditor';
import Settings from '../screens/Settings';
import Diagnostics from '../screens/Diagnostics';
import Planner from '../screens/Planner';
import ThemeStudio from '../screens/ThemeStudio';
import { useTrackerLive } from '../hooks/useTrackerLive';
import { useTrackingSnooze } from '../hooks/useTrackingSnooze';
import { useAppSelector } from '../store';
import { ShellProvider, useShell } from './shell';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../theme/types';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  JournalEditor: { entryId?: string } | undefined;
  NoteEditor: { noteId?: string } | undefined;
  Diagnostics: undefined;
  ThemeStudio: undefined;
};

export type MainTabParamList = {
  Tracker: undefined;
  Settings: undefined;
  Tools: undefined;
};

export type TrackerTabParamList = {
  Home: undefined;
  Stats: undefined;
  Calendar: { day?: string } | undefined;
};

export type ToolsTabParamList = {
  Journal: undefined;
  Notes: undefined;
  Motivation: undefined;
  Focus: undefined;
  Planner: undefined;
  Budget: undefined;
  Calculator: undefined;
  Challenges: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type TrackerScreenProps<T extends keyof TrackerTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TrackerTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ToolsScreenProps<T extends keyof ToolsTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<ToolsTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

interface AppNavigatorProps {
  initialRoute: keyof RootStackParamList;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const useTabOptions = () => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const tabScenePadding = moderateVerticalScale(86, 0.9) + Math.max(insets.bottom, moderateVerticalScale(10, 0.9));

  return useMemo(
    () => ({
      headerShown: false,
      lazy: true,
      sceneStyle: {
        backgroundColor: theme.colors.BACKGROUND,
        paddingBottom: tabScenePadding,
      },
      tabBarStyle: {
        position: 'absolute' as const,
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
      },
    }),
    [tabScenePadding, theme.colors.BACKGROUND],
  );
};

const TrackerHost = () => {
  const { trackerScreen } = useShell();
  if (trackerScreen === 'Stats') {
    return <Stats />;
  }
  if (trackerScreen === 'Calendar') {
    return <Calendar />;
  }
  return <Home />;
};

const ToolsHost = ({ navigation }: BottomTabScreenProps<MainTabParamList, 'Tools'>) => {
  const { toolsScreen } = useShell();
  const root = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  if (!root) {
    return null;
  }
  if (toolsScreen === 'Notes') {
    return <Notes navigation={root} />;
  }
  if (toolsScreen === 'Motivation') {
    return <Motivation />;
  }
  if (toolsScreen === 'Focus') {
    return <Focus />;
  }
  if (toolsScreen === 'Planner') {
    return <Planner />;
  }
  if (toolsScreen === 'Budget') {
    return <Budget />;
  }
  if (toolsScreen === 'Calculator') {
    return <Calculator />;
  }
  if (toolsScreen === 'Challenges') {
    return <Challenges />;
  }
  return <Journal navigation={root} />;
};

const MainTabs = () => {
  const mode = useAppSelector(state => state?.settings?.appMode) ?? 'tracker';
  const tabOptions = useTabOptions();
  useTrackerLive();
  useTrackingSnooze();

  return (
    <ShellProvider>
      <MainTab.Navigator
        initialRouteName={mode === 'tools' ? 'Tools' : 'Tracker'}
        screenOptions={tabOptions}
        tabBar={renderTabBar}
      >
        <MainTab.Screen name="Tracker" component={TrackerHost} />
        <MainTab.Screen name="Settings" component={Settings} />
        <MainTab.Screen name="Tools" component={ToolsHost} />
      </MainTab.Navigator>
    </ShellProvider>
  );
};

const AppNavigator = ({ initialRoute }: AppNavigatorProps) => {
  const theme = useTheme() as AppTheme;
  const light = theme.colorScheme === 'light';
  const navigationTheme: Theme = useMemo(
    () => {
      const base = light ? DefaultTheme : DarkTheme;
      return {
        ...base,
        colors: {
          ...base.colors,
          primary: theme.colors.BLUE,
          background: theme.colors.BACKGROUND,
          card: theme.colors.BACKGROUND_ELEVATED,
          text: theme.colors.TEXT,
          border: theme.colors.PANEL_BORDER,
          notification: theme.colors.RED_BRIGHT,
        },
      };
    },
    [light, theme],
  );
  const stackOptions = useMemo(
    () => ({
      headerShown: false,
      animation: theme.motion.stackAnimation,
      animationMatchesGesture: true,
      gestureEnabled: true,
      fullScreenGestureEnabled: Platform.OS === 'ios',
      contentStyle: { backgroundColor: theme.colors.BACKGROUND },
    }),
    [theme.colors.BACKGROUND, theme.motion.stackAnimation],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={stackOptions}>
        <Stack.Screen name="Onboarding" component={Onboarding} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'fade' }} />
        <Stack.Screen name="JournalEditor" component={JournalEditor} />
        <Stack.Screen name="NoteEditor" component={NoteEditor} />
        <Stack.Screen name="Diagnostics" component={Diagnostics} />
        <Stack.Screen name="ThemeStudio" component={ThemeStudio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
