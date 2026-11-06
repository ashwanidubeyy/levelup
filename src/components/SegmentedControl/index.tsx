import React from 'react';
import type { SegmentOption, SegmentedControlProps } from '../../types';
import { SegmentedControlStyles } from './styles';

const SegmentedControl = ({ options, value, onChange }: SegmentedControlProps) => (
  <SegmentedControlStyles.Container>
    {options?.map((option: SegmentOption) => {
      const active = option?.value === value;
      return (
        <SegmentedControlStyles.Segment
          key={option?.value}
          $active={active}
          onPress={() => onChange(option?.value)}
          accessibilityRole="button"
          accessibilityState={{ selected: active }}
        >
          <SegmentedControlStyles.Label $active={active}>{option?.label?.toUpperCase()}</SegmentedControlStyles.Label>
        </SegmentedControlStyles.Segment>
      );
    })}
  </SegmentedControlStyles.Container>
);

export default SegmentedControl;
