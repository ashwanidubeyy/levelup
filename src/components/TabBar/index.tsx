import React from 'react';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { moderateScale } from 'react-native-size-matters';
import { TabBarStyles } from './styles';
import { Icons } from '../../assets/icons';
import { TAB_CONSTANTS } from '../../constants/screens';
import { COLORS } from '../../theme/colors';

const { HomeIcon, StatsIcon, QuestIcon, JournalIcon, SettingsIcon } = Icons;

const ICON_SIZE = moderateScale(22, 0.9);

const TAB_ITEMS: Record<string, { Icon: (props: any) => React.JSX.Element; labelKey: string }> = {
  Home: { Icon: HomeIcon, labelKey: TAB_CONSTANTS.HOME },
  Stats: { Icon: StatsIcon, labelKey: TAB_CONSTANTS.STATS },
  Quests: { Icon: QuestIcon, labelKey: TAB_CONSTANTS.QUESTS },
  Journal: { Icon: JournalIcon, labelKey: TAB_CONSTANTS.JOURNAL },
  Settings: { Icon: SettingsIcon, labelKey: TAB_CONSTANTS.SETTINGS },
};

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <TabBarStyles.Container $bottom={insets.bottom}>
      {state?.routes?.map((route: any, index: number) => {
        const active = state?.index === index;
        const item = TAB_ITEMS[route?.name];
        const color = active ? COLORS.BLUE_GLOW : COLORS.TEXT_DIM;
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
            <TabBarStyles.Indicator $active={active} />
            {item ? <item.Icon size={ICON_SIZE} color={color} /> : null}
            <TabBarStyles.Label $color={color}>{label?.toUpperCase()}</TabBarStyles.Label>
          </TabBarStyles.Tab>
        );
      })}
    </TabBarStyles.Container>
  );
};

export default TabBar;
