import React from 'react';
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
import Stats from '../screens/Stats';
import Quests from '../screens/Quests';
import Journal from '../screens/Journal';
import JournalEditor from '../screens/JournalEditor';
import Settings from '../screens/Settings';
import Diagnostics from '../screens/Diagnostics';
import { useTrackerLive } from '../hooks/useTrackerLive';
import { COLORS } from '../theme/colors';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  JournalEditor: { entryId?: string } | undefined;
  Diagnostics: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Stats: undefined;
  Quests: undefined;
  Journal: undefined;
  Settings: undefined;
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

const NAVIGATION_THEME: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.BLUE,
    background: COLORS.BACKGROUND,
    card: COLORS.BACKGROUND_ELEVATED,
    text: COLORS.TEXT,
    border: COLORS.PANEL_BORDER,
    notification: COLORS.RED_BRIGHT,
  },
};

const STACK_OPTIONS = {
  headerShown: false,
  animation: 'fade_from_bottom' as const,
  contentStyle: { backgroundColor: COLORS.BACKGROUND },
};

const TAB_OPTIONS = { headerShown: false, lazy: true };

const renderTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const MainTabs = () => {
  useTrackerLive();

  return (
    <Tab.Navigator screenOptions={TAB_OPTIONS} tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Quests" component={Quests} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const AppNavigator = ({ initialRoute }: AppNavigatorProps) => (
  <NavigationContainer theme={NAVIGATION_THEME}>
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={STACK_OPTIONS}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="JournalEditor" component={JournalEditor} />
      <Stack.Screen name="Diagnostics" component={Diagnostics} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
