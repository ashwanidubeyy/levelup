import React, { useRef } from 'react';
import { Animated } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { moderateScale } from 'react-native-size-matters';
import { TabBarStyles } from './styles';
import { Icons } from '../../assets/icons';
import { TAB_CONSTANTS } from '../../constants/screens';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

const { HomeIcon, JournalIcon, BudgetIcon, MoreIcon } = Icons;

const BASE_ICON_SIZE = 21;

const TAB_ITEMS: Record<string, { Icon: (props: any) => React.JSX.Element; labelKey: string }> = {
  Home: { Icon: HomeIcon, labelKey: TAB_CONSTANTS.HOME },
  JournalHub: { Icon: JournalIcon, labelKey: TAB_CONSTANTS.JOURNAL_HUB },
  Budget: { Icon: BudgetIcon, labelKey: TAB_CONSTANTS.BUDGET },
  More: { Icon: MoreIcon, labelKey: TAB_CONSTANTS.MORE },
};

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const iconSize = moderateScale(BASE_ICON_SIZE * theme.layout.tabIconScale, 0.9);
  const bottomInset = Math.max(insets.bottom, moderateScale(10, 0.9));
  const scalesRef = useRef<Record<string, Animated.Value>>({});

  const scaleFor = (key: string) => {
    if (!scalesRef.current[key]) {
      scalesRef.current[key] = new Animated.Value(1);
    }
    return scalesRef.current[key];
  };

  return (
    <TabBarStyles.Outer $bottom={bottomInset}>
      <TabBarStyles.Bar>
        {state?.routes?.map((route: any, index: number) => {
          const active = state?.index === index;
          const item = TAB_ITEMS[route?.name];
          if (!item) {
            return null;
          }
          const color = active ? theme.colors.TEXT : theme.colors.TEXT_DIM;
          const strokeWidth = active ? theme.icons.activeStrokeWidth : theme.icons.strokeWidth;
          const label = t(item.labelKey);
          const scale = scaleFor(route?.key);
          const handlePress = () => {
            Animated.sequence([
              Animated.timing(scale, { toValue: theme.motion.pressScale, duration: 80, useNativeDriver: true }),
              Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
            ]).start();
            const event = navigation.emit({ type: 'tabPress', target: route?.key, canPreventDefault: true });
            if (!active && !event?.defaultPrevented) {
              navigation.navigate(route?.name);
            }
          };
          return (
            <TabBarStyles.Tab
              key={route?.key}
              $active={active}
              onPress={handlePress}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={label}
            >
              <TabBarStyles.ActivePill $accent={theme.colors.BLUE_GLOW} $visible={active} />
              <Animated.View style={{ transform: [{ scale }] }}>
                <item.Icon size={iconSize} color={color} strokeWidth={strokeWidth} />
              </Animated.View>
              <TabBarStyles.Label $active={active}>{label}</TabBarStyles.Label>
            </TabBarStyles.Tab>
          );
        })}
      </TabBarStyles.Bar>
    </TabBarStyles.Outer>
  );
};

export default TabBar;
