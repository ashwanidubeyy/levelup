import React, { useMemo } from 'react';
import {
  DarkTheme,
  NavigationContainer,
  type CompositeScreenProps,
  type Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  type BottomTabBarProps,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import Focus from '../screens/Focus';
import Challenges from '../screens/Challenges';
import Budget from '../screens/Budget';
import More from '../screens/More';
import Stats from '../screens/Stats';
import Calendar from '../screens/Calendar';
import Journal from '../screens/Journal';
import JournalEditor from '../screens/JournalEditor';
import Settings from '../screens/Settings';
import Diagnostics from '../screens/Diagnostics';
import Planner from '../screens/Planner';
import { useTrackerLive } from '../hooks/useTrackerLive';
import { useNotificationSync } from '../hooks/useNotificationSync';
import { useTrackingSnooze } from '../hooks/useTrackingSnooze';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../theme/types';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  Focus: undefined;
  JournalEditor: { entryId?: string } | undefined;
  Stats: undefined;
  Calendar: { day?: string } | undefined;
  Settings: undefined;
  Diagnostics: undefined;
  Planner: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Journal: undefined;
  Challenges: undefined;
  Budget: undefined;
  More: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

interface AppNavigatorProps {
  initialRoute: keyof RootStackParamList;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();


const TAB_OPTIONS = { headerShown: false, lazy: true };

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const MainTabs = () => {
  useTrackerLive();
  useNotificationSync();
  useTrackingSnooze();

  return (
    <Tab.Navigator screenOptions={TAB_OPTIONS} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Challenges" component={Challenges} />
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

const AppNavigator = ({ initialRoute }: AppNavigatorProps) => {
  const theme = useTheme() as AppTheme;
  const navigationTheme: Theme = useMemo(
    () => ({
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: theme.colors.BLUE,
        background: theme.colors.BACKGROUND,
        card: theme.colors.BACKGROUND_ELEVATED,
        text: theme.colors.TEXT,
        border: theme.colors.PANEL_BORDER,
        notification: theme.colors.RED_BRIGHT,
      },
    }),
    [theme],
  );
  const stackOptions = useMemo(
    () => ({
      headerShown: false,
      animation: 'fade_from_bottom' as const,
      contentStyle: { backgroundColor: theme.colors.BACKGROUND },
    }),
    [theme],
  );

  return (
  <NavigationContainer theme={navigationTheme}>
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={stackOptions}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Focus" component={Focus} />
      <Stack.Screen name="JournalEditor" component={JournalEditor} />
      <Stack.Screen name="Stats" component={Stats} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Diagnostics" component={Diagnostics} />
      <Stack.Screen name="Planner" component={Planner} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;
