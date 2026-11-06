import React from 'react';
import type { MoodOption, MoodSelectorProps } from '../../types';
import { MoodSelectorStyles } from './styles';

const MoodSelector = ({ options, value, onChange }: MoodSelectorProps) => (
  <MoodSelectorStyles.Container>
    {options?.map((option: MoodOption) => {
      const active = option?.value === value;
      return (
        <MoodSelectorStyles.Chip
          key={option?.value}
          $active={active}
          $color={option?.color}
          onPress={() => onChange(option?.value)}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
        >
          <MoodSelectorStyles.Dot $color={option?.color} />
          <MoodSelectorStyles.Label $active={active}>{option?.label}</MoodSelectorStyles.Label>
        </MoodSelectorStyles.Chip>
      );
    })}
  </MoodSelectorStyles.Container>
);

export default MoodSelector;
