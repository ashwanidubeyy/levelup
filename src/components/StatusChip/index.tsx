import React from 'react';
import type { StatusChipProps } from '../../types';
import { StatusChipStyles } from './styles';
import { chipColorFor } from '../../utils/variant';

const StatusChip = ({ label, variant }: StatusChipProps) => {
  const color = chipColorFor(variant);

  return (
    <StatusChipStyles.Container $color={color}>
      <StatusChipStyles.Label $color={color}>{label}</StatusChipStyles.Label>
    </StatusChipStyles.Container>
  );
};

export default StatusChip;
