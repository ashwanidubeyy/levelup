import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from 'styled-components/native';
import type { DateNavigatorProps } from '../../types';
import { DateNavigatorStyles } from './styles';
import { Icons } from '../../assets/icons';
import type { AppTheme } from '../../theme/types';

const { ChevronLeftIcon, ChevronRightIcon } = Icons;

const ICON_SIZE = moderateScale(24, 0.9);

const DateNavigator = ({ label, onPrevious, onNext, nextDisabled, previousLabel, nextLabel }: DateNavigatorProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <DateNavigatorStyles.Container>
      <DateNavigatorStyles.Arrow
        onPress={onPrevious}
        $disabled={false}
        accessibilityRole="button"
        accessibilityLabel={previousLabel}
      >
        <ChevronLeftIcon size={ICON_SIZE} color={theme.colors.BLUE_LIGHT} />
      </DateNavigatorStyles.Arrow>
      <DateNavigatorStyles.Label>{label?.toUpperCase()}</DateNavigatorStyles.Label>
      <DateNavigatorStyles.Arrow
        onPress={onNext}
        disabled={nextDisabled}
        $disabled={nextDisabled}
        accessibilityRole="button"
        accessibilityLabel={nextLabel}
      >
        <ChevronRightIcon size={ICON_SIZE} color={theme.colors.BLUE_LIGHT} />
      </DateNavigatorStyles.Arrow>
    </DateNavigatorStyles.Container>
  );
};

export default DateNavigator;
