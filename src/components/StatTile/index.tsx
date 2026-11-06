import React from 'react';
import type { StatTileProps } from '../../types';
import { StatTileStyles } from './styles';

const StatTile = ({ label, value, accent = 'system' }: StatTileProps) => (
  <StatTileStyles.Container $accent={accent}>
    <StatTileStyles.Value numberOfLines={1} adjustsFontSizeToFit>
      {value}
    </StatTileStyles.Value>
    <StatTileStyles.Label numberOfLines={1}>{label}</StatTileStyles.Label>
  </StatTileStyles.Container>
);

export default StatTile;
