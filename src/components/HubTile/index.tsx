import React from 'react';
import type { HubTileProps } from '../../types';
import { HubTileStyles } from './styles';

const HubTile = ({ label, value, hint, accent = 'system', onPress }: HubTileProps) => (
  <HubTileStyles.Tile onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
    <HubTileStyles.Value $accent={accent} numberOfLines={1}>
      {value}
    </HubTileStyles.Value>
    <HubTileStyles.Label numberOfLines={1}>{label}</HubTileStyles.Label>
    <HubTileStyles.Hint numberOfLines={1}>{hint}</HubTileStyles.Hint>
  </HubTileStyles.Tile>
);

export default HubTile;
