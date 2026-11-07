import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ModeSwitcherStyles } from './styles';
import { TAB_CONSTANTS } from '../../constants/screens';
import { useAppDispatch, useAppSelector } from '../../store';
import { setAppMode } from '../../store/slices/settingsSlice';
import type { AppMode } from '../../theme/types';

const MODES: Array<{ id: AppMode; labelKey: string }> = [
  { id: 'tracker', labelKey: TAB_CONSTANTS.TRACKER },
  { id: 'tools', labelKey: TAB_CONSTANTS.TOOLS },
];

const ModeSwitcher = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(state => state?.settings?.appMode) ?? 'tracker';

  return (
    <ModeSwitcherStyles.Bar $top={insets.top}>
      <ModeSwitcherStyles.Chips>
        {MODES.map((item: (typeof MODES)[number]) => {
          const active = mode === item.id;
          return (
            <ModeSwitcherStyles.Chip
              key={item.id}
              $active={active}
              onPress={() => dispatch(setAppMode(item.id))}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={t(item.labelKey)}
            >
              <ModeSwitcherStyles.ChipLabel $active={active}>{t(item.labelKey)}</ModeSwitcherStyles.ChipLabel>
            </ModeSwitcherStyles.Chip>
          );
        })}
      </ModeSwitcherStyles.Chips>
    </ModeSwitcherStyles.Bar>
  );
};

export default ModeSwitcher;
