import React from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { moderateScale } from 'react-native-size-matters';
import { TabBarStyles } from './styles';
import { Icons } from '../../assets/icons';
import { TAB_CONSTANTS } from '../../constants/screens';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

const { HomeIcon, JournalIcon, ChallengeIcon, BudgetIcon, MoreIcon } = Icons;

const BASE_ICON_SIZE = 22;

const TAB_ITEMS: Record<string, { Icon: (props: any) => React.JSX.Element; labelKey: string }> = {
  Home: { Icon: HomeIcon, labelKey: TAB_CONSTANTS.HOME },
  Journal: { Icon: JournalIcon, labelKey: TAB_CONSTANTS.JOURNAL },
  Challenges: { Icon: ChallengeIcon, labelKey: TAB_CONSTANTS.CHALLENGES },
  Budget: { Icon: BudgetIcon, labelKey: TAB_CONSTANTS.BUDGET },
  More: { Icon: MoreIcon, labelKey: TAB_CONSTANTS.MORE },
};

const INDICATOR_BY_MODE = {
  line: TabBarStyles.IndicatorLine,
  pill: TabBarStyles.IndicatorPill,
  glow: TabBarStyles.IndicatorGlow,
} as const;

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const Indicator = INDICATOR_BY_MODE[theme.layout.tabIndicator];
  const iconSize = moderateScale(BASE_ICON_SIZE * theme.layout.tabIconScale, 0.9);

  return (
    <TabBarStyles.Container $bottom={insets.bottom}>
      {state?.routes?.map((route: any, index: number) => {
        const active = state?.index === index;
        const item = TAB_ITEMS[route?.name];
        const color = active ? theme.colors.YELLOW : theme.colors.TEXT_DIM;
        const strokeWidth = active ? theme.icons.activeStrokeWidth : theme.icons.strokeWidth;
        const label = t(item?.labelKey ?? '');
        const handlePress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route?.key, canPreventDefault: true });
          if (!active && !event?.defaultPrevented) {
            navigation.navigate(route?.name);
          }
        };
        return (
          <TabBarStyles.Tab
            key={route?.key}
            onPress={handlePress}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={label}
          >
            <Indicator $active={active} />
            {item ? <item.Icon size={iconSize} color={color} strokeWidth={strokeWidth} /> : null}
            <TabBarStyles.Label $color={color} numberOfLines={1}>{label?.toUpperCase()}</TabBarStyles.Label>
          </TabBarStyles.Tab>
        );
      })}
    </TabBarStyles.Container>
  );
};

export default TabBar;
