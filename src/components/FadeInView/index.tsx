import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { FadeInViewProps } from '../../types';
import { FadeInViewStyles } from './styles';

const FadeInView = ({ children, delay = 0 }: FadeInViewProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 340,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(offset, {
        toValue: 0,
        duration: 340,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, offset, opacity]);

  return (
    <FadeInViewStyles.Animated style={{ opacity, transform: [{ translateY: offset }] }}>
      {children}
    </FadeInViewStyles.Animated>
  );
};

export default FadeInView;
