import React from 'react';
import type { StatBarProps } from '../../types';
import { StatBarStyles } from './styles';
import { clamp } from '../../utils/helpers';

const StatBar = ({ progress, variant = 'system', thin = false }: StatBarProps) => {
  const value = clamp(progress ?? 0, 0, 1);

  return (
    <StatBarStyles.Track $thin={thin}>
      <StatBarStyles.Fill $flex={value} $variant={variant} />
      <StatBarStyles.Rest $flex={1 - value} />
    </StatBarStyles.Track>
  );
};

export default StatBar;
