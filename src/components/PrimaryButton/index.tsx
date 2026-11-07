import React from 'react';
import { useTheme } from 'styled-components/native';
import Loader from '../Loader';
import type { PrimaryButtonProps } from '../../types';
import { PrimaryButtonStyles } from './styles';
import { buttonGradientFor } from '../../utils/variant';
import type { AppTheme } from '../../theme/types';

const START = { x: 0, y: 0 };
const END = { x: 1, y: 1 };

const PrimaryButton = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  compact = false,
  accessibilityLabel,
}: PrimaryButtonProps) => {
  const theme = useTheme() as AppTheme;
  return (
  <PrimaryButtonStyles.Touchable
    activeOpacity={0.8}
    onPress={onPress}
    disabled={disabled || loading}
    $disabled={disabled}
    $compact={compact}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel ?? label}
  >
    <PrimaryButtonStyles.Gradient
      colors={[...buttonGradientFor(variant, theme)]}
      start={START}
      end={END}
      $variant={variant}
      $compact={compact}
    >
      {loading ? (
        <PrimaryButtonStyles.LoaderSlot>
          <Loader />
        </PrimaryButtonStyles.LoaderSlot>
      ) : null}
      <PrimaryButtonStyles.Label $compact={compact} $variant={variant}>
        {label?.toUpperCase()}
      </PrimaryButtonStyles.Label>
    </PrimaryButtonStyles.Gradient>
  </PrimaryButtonStyles.Touchable>
  );
};

export default PrimaryButton;
