import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import type { StepperProps } from '../../types';
import { StepperStyles } from './styles';
import { Icons } from '../../assets/icons';
import { COLORS } from '../../theme/colors';
import { clamp } from '../../utils/helpers';

const { MinusIcon, PlusIcon } = Icons;

const ICON_SIZE = moderateScale(18, 0.9);

const Stepper = ({ label, valueLabel, value, min, max, step, onChange }: StepperProps) => {
  const canDecrease = value > min;
  const canIncrease = value < max;

  const handleDecrease = () => onChange(clamp(value - step, min, max));
  const handleIncrease = () => onChange(clamp(value + step, min, max));

  return (
    <StepperStyles.Container>
      <StepperStyles.Label>{label}</StepperStyles.Label>
      <StepperStyles.Controls>
        <StepperStyles.Button
          onPress={handleDecrease}
          disabled={!canDecrease}
          $disabled={!canDecrease}
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          <MinusIcon size={ICON_SIZE} color={COLORS.BLUE_LIGHT} />
        </StepperStyles.Button>
        <StepperStyles.Value>{valueLabel}</StepperStyles.Value>
        <StepperStyles.Button
          onPress={handleIncrease}
          disabled={!canIncrease}
          $disabled={!canIncrease}
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          <PlusIcon size={ICON_SIZE} color={COLORS.BLUE_LIGHT} />
        </StepperStyles.Button>
      </StepperStyles.Controls>
    </StepperStyles.Container>
  );
};

export default Stepper;
