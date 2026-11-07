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

const { HomeIcon, JournalIcon, BudgetIcon, MoreIcon } = Icons;

const BASE_ICON_SIZE = 20;

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
  const bottomInset = insets.bottom + moderateScale(10, 0.9);

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
              {active ? <TabBarStyles.ActiveHalo $accent={theme.colors.BLUE_GLOW} /> : null}
              <item.Icon size={iconSize} color={color} strokeWidth={strokeWidth} />
              {active ? <TabBarStyles.Dot $accent={theme.colors.YELLOW} /> : null}
            </TabBarStyles.Tab>
          );
        })}
      </TabBarStyles.Bar>
    </TabBarStyles.Outer>
  );
};

export default TabBar;
