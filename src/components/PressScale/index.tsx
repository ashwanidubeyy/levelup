import React, { useRef } from 'react';
import { Animated } from 'react-native';
import type { PressScaleProps } from '../../types';
import { PressScaleStyles } from './styles';

const PressScale = ({ children, onPress, accessibilityLabel, disabled = false }: PressScaleProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40, bounciness: 0 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 4 }).start();
  };

  return (
    <PressScaleStyles.Hit
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <PressScaleStyles.Scale style={{ transform: [{ scale }] }}>{children}</PressScaleStyles.Scale>
    </PressScaleStyles.Hit>
  );
};

export default PressScale;
