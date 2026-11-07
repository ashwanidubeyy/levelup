import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateVerticalScale } from 'react-native-size-matters';
import TabBar from '../components/TabBar';
import Onboarding from '../screens/Onboarding';
import Home from '../screens/Home';
import Focus from '../screens/Focus';
import JournalHub from '../screens/JournalHub';
import Budget from '../screens/Budget';
import More from '../screens/More';
import Stats from '../screens/Stats';
import Calendar from '../screens/Calendar';
import JournalEditor from '../screens/JournalEditor';
import Settings from '../screens/Settings';
import Diagnostics from '../screens/Diagnostics';
import Planner from '../screens/Planner';
import { useTrackerLive } from '../hooks/useTrackerLive';
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
  JournalHub: { section?: 'journal' | 'challenges' } | undefined;
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

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const MainTabs = () => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  useTrackerLive();
  useTrackingSnooze();

  const tabScenePadding = moderateVerticalScale(74, 0.9) + Math.max(insets.bottom, moderateVerticalScale(10, 0.9));

  const tabOptions = useMemo(
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

  return (
    <Tab.Navigator screenOptions={tabOptions} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="JournalHub" component={JournalHub} />
      <Tab.Screen name="Budget" component={Budget} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
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
