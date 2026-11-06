import React from 'react';
import { Switch } from 'react-native';
import type { ToggleRowProps } from '../../types';
import { ToggleRowStyles } from './styles';
import { COLORS } from '../../theme/colors';

const TRACK_COLORS = { false: COLORS.PANEL_BORDER, true: COLORS.BLUE_DEEP };

const ToggleRow = ({ label, hint, value, onValueChange, disabled = false }: ToggleRowProps) => (
  <ToggleRowStyles.Container $disabled={disabled}>
    <ToggleRowStyles.Texts>
      <ToggleRowStyles.Label>{label}</ToggleRowStyles.Label>
      {hint ? <ToggleRowStyles.Hint>{hint}</ToggleRowStyles.Hint> : null}
    </ToggleRowStyles.Texts>
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={TRACK_COLORS}
      thumbColor={value ? COLORS.BLUE_GLOW : COLORS.TEXT_MUTED}
      accessibilityLabel={label}
    />
  </ToggleRowStyles.Container>
);

export default ToggleRow;
