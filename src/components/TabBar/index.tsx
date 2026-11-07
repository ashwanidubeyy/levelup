import React, { useRef, useState } from 'react';
import { Animated } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { TAB_BAR_METRICS, TabBarStyles } from './styles';
import { Icons } from '../../assets/icons';
import { TAB_CONSTANTS } from '../../constants/screens';
import { useAppDispatch } from '../../store';
import { setAppMode } from '../../store/slices/settingsSlice';
import { useShell, type ToolsDestination, type TrackerDestination } from '../../navigation/shell';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

const {
  HomeIcon,
  StatsIcon,
  CalendarIcon,
  JournalIcon,
  NotesIcon,
  MotivationIcon,
  FocusIcon,
  PlannerIcon,
  BudgetIcon,
  CalculatorIcon,
  ChallengeIcon,
  SettingsIcon,
  MoreIcon,
  PlusIcon,
  CrossIcon,
} = Icons;

const BASE_ICON_SIZE = 20;
const FAN_SLOTS = 8;

const TRACKER_ITEMS: Array<{ id: TrackerDestination; Icon: (props: any) => React.JSX.Element; labelKey: string }> = [
  { id: 'Home', Icon: HomeIcon, labelKey: TAB_CONSTANTS.HOME },
  { id: 'Stats', Icon: StatsIcon, labelKey: TAB_CONSTANTS.STATS },
  { id: 'Calendar', Icon: CalendarIcon, labelKey: TAB_CONSTANTS.CALENDAR },
];

const TOOLS_ITEMS: Array<{ id: ToolsDestination; Icon: (props: any) => React.JSX.Element; labelKey: string }> = [
  { id: 'Journal', Icon: JournalIcon, labelKey: TAB_CONSTANTS.JOURNAL },
  { id: 'Notes', Icon: NotesIcon, labelKey: TAB_CONSTANTS.NOTES },
  { id: 'Motivation', Icon: MotivationIcon, labelKey: TAB_CONSTANTS.MOTIVATION },
  { id: 'Focus', Icon: FocusIcon, labelKey: TAB_CONSTANTS.FOCUS },
  { id: 'Planner', Icon: PlannerIcon, labelKey: TAB_CONSTANTS.PLANNER },
  { id: 'Budget', Icon: BudgetIcon, labelKey: TAB_CONSTANTS.BUDGET },
  { id: 'Calculator', Icon: CalculatorIcon, labelKey: TAB_CONSTANTS.CALCULATOR },
  { id: 'Challenges', Icon: ChallengeIcon, labelKey: TAB_CONSTANTS.CHALLENGES },
];

const TABS: Array<{ id: 'Tracker' | 'Settings' | 'Tools'; Icon: (props: any) => React.JSX.Element; labelKey: string }> = [
  { id: 'Tracker', Icon: HomeIcon, labelKey: TAB_CONSTANTS.TRACKER },
  { id: 'Settings', Icon: SettingsIcon, labelKey: TAB_CONSTANTS.SETTINGS },
  { id: 'Tools', Icon: MoreIcon, labelKey: TAB_CONSTANTS.TOOLS },
];

interface FanItemProps {
  progress: Animated.Value;
  index: number;
  columns: number;
  label: string;
  active: boolean;
  Icon: (props: any) => React.JSX.Element;
  iconSize: number;
  color: string;
  activeColor: string;
  strokeWidth: number;
  bottom: number;
  open: boolean;
  onPress: () => void;
}

const FanItem = ({
  progress,
  index,
  columns,
  label,
  active,
  Icon,
  iconSize,
  color,
  activeColor,
  strokeWidth,
  bottom,
  open,
  onPress,
}: FanItemProps) => {
  const column = index % columns;
  const row = Math.floor(index / columns);
  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -column * TAB_BAR_METRICS.FAN_SPREAD],
  });
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -((row + 1) * TAB_BAR_METRICS.FAN_STEP)],
  });
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] });
  const opacity = progress;

  return (
    <TabBarStyles.Bubble
      $bottom={bottom}
      pointerEvents={open ? 'auto' : 'none'}
      style={{ opacity, transform: [{ translateX }, { translateY }, { scale }] }}
    >
      <TabBarStyles.BubbleButton onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
        <TabBarStyles.BubbleLabel>{label}</TabBarStyles.BubbleLabel>
        <TabBarStyles.BubbleIcon $active={active}>
          <Icon size={iconSize} color={active ? activeColor : color} strokeWidth={strokeWidth} />
        </TabBarStyles.BubbleIcon>
      </TabBarStyles.BubbleButton>
    </TabBarStyles.Bubble>
  );
};

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const shell = useShell();
  const [open, setOpen] = useState(false);
  const slots = useRef(Array.from({ length: FAN_SLOTS }, () => new Animated.Value(0))).current;
  const iconSize = moderateScale(BASE_ICON_SIZE * theme.layout.tabIconScale, 0.9);
  const bottomInset = Math.max(insets.bottom, moderateScale(10, 0.9));
  const fabBottom = bottomInset + TAB_BAR_METRICS.BAR_HEIGHT + moderateVerticalScale(12, 0.9);
  const routeName = state?.routes?.[state?.index ?? 0]?.name;
  const showFan = routeName === 'Tracker' || routeName === 'Tools';
  const items = routeName === 'Tools' ? TOOLS_ITEMS : TRACKER_ITEMS;
  const columns = items.length > 4 ? 2 : 1;

  const closing = useRef(false);

  const stopMotion = () => {
    slots.forEach((value: Animated.Value) => value.stopAnimation());
  };

  const closeFan = (after?: () => void) => {
    closing.current = true;
    stopMotion();
    Animated.parallel(
      slots.map((value: Animated.Value) =>
        Animated.timing(value, { toValue: 0, duration: 140, useNativeDriver: true }),
      ),
    ).start(({ finished }: { finished: boolean }) => {
      if (!finished || !closing.current) {
        return;
      }
      closing.current = false;
      setOpen(false);
      after?.();
    });
  };

  const openFan = () => {
    closing.current = false;
    stopMotion();
    setOpen(true);
    slots.forEach((value: Animated.Value, index: number) => {
      if (index >= items.length) {
        value.setValue(0);
      }
    });
    Animated.stagger(
      36,
      slots.slice(0, items.length).map((value: Animated.Value) =>
        Animated.spring(value, { toValue: 1, friction: 7, useNativeDriver: true }),
      ),
    ).start();
  };

  const toggleFan = () => {
    if (open) {
      closeFan();
      return;
    }
    openFan();
  };

  const handleTab = (name: 'Tracker' | 'Settings' | 'Tools') => {
    const go = () => {
      if (name === 'Tracker') {
        dispatch(setAppMode('tracker'));
      }
      if (name === 'Tools') {
        dispatch(setAppMode('tools'));
      }
      const route = state?.routes?.find((item: { name: string }) => item?.name === name);
      const event = navigation.emit({ type: 'tabPress', target: route?.key, canPreventDefault: true });
      if (!event?.defaultPrevented) {
        navigation.navigate(name);
      }
    };
    if (open) {
      closeFan(go);
      return;
    }
    go();
  };

  const handleDestination = (id: TrackerDestination | ToolsDestination) => {
    closeFan(() => {
      if (routeName === 'Tools') {
        shell.openTools(id as ToolsDestination);
        dispatch(setAppMode('tools'));
        navigation.navigate('Tools');
        return;
      }
      shell.openTracker(id as TrackerDestination);
      dispatch(setAppMode('tracker'));
      navigation.navigate('Tracker');
    });
  };

  return (
    <TabBarStyles.Outer>
      {open ? <TabBarStyles.Scrim onPress={() => closeFan()} accessibilityLabel={t(TAB_CONSTANTS.CLOSE_MENU)} /> : null}
      {showFan ? (
        <TabBarStyles.Dock>
          {items.map((item, index: number) => {
            const progress = slots[index];
            const active = routeName === 'Tools' ? shell.toolsScreen === item.id : shell.trackerScreen === item.id;
            return progress ? (
              <FanItem
                key={item.id}
                progress={progress}
                index={index}
                columns={columns}
                label={t(item.labelKey)}
                active={active}
                Icon={item.Icon}
                iconSize={iconSize}
                color={theme.colors.TEXT}
                activeColor={theme.colors.BLACK}
                strokeWidth={active ? theme.icons.activeStrokeWidth : theme.icons.strokeWidth}
                bottom={fabBottom}
                open={open}
                onPress={() => handleDestination(item.id)}
              />
            ) : null;
          })}
          <TabBarStyles.FabSlot $bottom={fabBottom}>
            <TabBarStyles.Fab
              onPress={toggleFan}
              accessibilityRole="button"
              accessibilityLabel={t(open ? TAB_CONSTANTS.CLOSE_MENU : TAB_CONSTANTS.MENU)}
            >
              {open ? (
                <CrossIcon size={iconSize} color={theme.colors.BLACK} strokeWidth={theme.icons.activeStrokeWidth} />
              ) : (
                <PlusIcon size={iconSize} color={theme.colors.BLACK} strokeWidth={theme.icons.activeStrokeWidth} />
              )}
            </TabBarStyles.Fab>
          </TabBarStyles.FabSlot>
        </TabBarStyles.Dock>
      ) : null}
      <TabBarStyles.Bar $bottom={bottomInset}>
        {TABS.map((tab) => {
          const active = routeName === tab.id;
          const color = active ? theme.colors.TEXT : theme.colors.TEXT_DIM;
          const label = t(tab.labelKey);
          return (
            <TabBarStyles.Tab
              key={tab.id}
              onPress={() => handleTab(tab.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={label}
            >
              <TabBarStyles.Marker $visible={active} />
              <tab.Icon
                size={iconSize}
                color={color}
                strokeWidth={active ? theme.icons.activeStrokeWidth : theme.icons.strokeWidth}
              />
              <TabBarStyles.Label $active={active}>{label}</TabBarStyles.Label>
            </TabBarStyles.Tab>
          );
        })}
      </TabBarStyles.Bar>
    </TabBarStyles.Outer>
  );
};

export default TabBar;
