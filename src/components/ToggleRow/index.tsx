import React, { useMemo } from 'react';
import { Switch } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { ToggleRowProps } from '../../types';
import { ToggleRowStyles } from './styles';
import type { AppTheme } from '../../theme/types';

const ToggleRow = ({ label, hint, value, onValueChange, disabled = false }: ToggleRowProps) => {
  const theme = useTheme() as AppTheme;
  const trackColor = useMemo(
    () => ({ false: theme.colors.PANEL_BORDER, true: theme.colors.BLUE_DEEP }),
    [theme],
  );
  return (
    <ToggleRowStyles.Container $disabled={disabled}>
      <ToggleRowStyles.Texts>
        <ToggleRowStyles.Label>{label}</ToggleRowStyles.Label>
        {hint ? <ToggleRowStyles.Hint>{hint}</ToggleRowStyles.Hint> : null}
      </ToggleRowStyles.Texts>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={trackColor}
        thumbColor={value ? theme.colors.BLUE_GLOW : theme.colors.TEXT_MUTED}
        accessibilityLabel={label}
      />
    </ToggleRowStyles.Container>
  );
};

export default ToggleRow;
