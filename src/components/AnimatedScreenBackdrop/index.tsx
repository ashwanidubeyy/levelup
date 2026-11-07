import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import { AnimatedScreenBackdropStyles } from './styles';

interface Props {
  scrollX?: Animated.Value;
  scrollY?: Animated.Value;
}

const AnimatedScreenBackdrop = ({ scrollX, scrollY }: Props) => {
  const theme = useTheme() as AppTheme;
  const drift = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const zero = useRef(new Animated.Value(0)).current;
  const offsetX = scrollX ?? zero;
  const offsetY = scrollY ?? zero;

  const { leftSource, rightSource } = useMemo(() => {
    const pool = theme.assets.backdropArt;
    const len = pool.length;
    const i = len > 0 ? Math.floor(Math.random() * len) : 0;
    let j = len > 1 ? Math.floor(Math.random() * len) : 0;
    if (len > 1 && j === i) {
      j = (j + 1) % len;
    }
    return { leftSource: pool[i], rightSource: pool[j] };
  }, [theme.id]);

  useEffect(() => {
    const driftMs = theme.motion.backdropDriftMs;
    const shimmerMs = theme.motion.backdropShimmerMs;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: driftMs, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: driftMs, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const sweep = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: shimmerMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    sweep.start();
    return () => {
      loop.stop();
      sweep.stop();
    };
  }, [drift, shimmer, theme.id, theme.motion.backdropDriftMs, theme.motion.backdropShimmerMs]);

  const interactiveX = Animated.multiply(offsetX, -theme.motion.parallaxX);
  const interactiveY = Animated.multiply(offsetY, -theme.motion.parallaxY);

  const auraOne = {
    transform: [
      { translateX: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [-18, 22] }), interactiveX) },
      { translateY: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [12, -14] }), interactiveY) },
      {
        scale: drift.interpolate({ inputRange: [0, 1], outputRange: [1, theme.motion.auraPulseMax] }),
      },
    ],
  };

  const auraTwo = {
    transform: [
      {
        translateX: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [28, -12] }), Animated.multiply(interactiveX, 1.2)),
      },
      {
        translateY: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [-20, 24] }), Animated.multiply(interactiveY, 1.1)),
      },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0.85] }),
  };

  const leftAnim = {
    transform: [
      {
        translateY: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [0, -16] }), Animated.multiply(interactiveY, 0.7)),
      },
      { translateX: Animated.multiply(interactiveX, 0.6) },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0.44] }),
  };

  const rightAnim = {
    transform: [
      {
        translateY: Animated.add(drift.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }), Animated.multiply(interactiveY, 0.5)),
      },
      { translateX: Animated.multiply(interactiveX, -0.8) },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0.4] }),
  };

  const shimmerAnim = {
    transform: [
      {
        translateX: shimmer.interpolate({ inputRange: [0, 1], outputRange: [-400, 800] }),
      },
      { translateX: interactiveX },
    ],
  };

  return (
    <AnimatedScreenBackdropStyles.Root pointerEvents="none">
      <AnimatedScreenBackdropStyles.Shimmer style={shimmerAnim} />
      <AnimatedScreenBackdropStyles.Aura style={auraOne} />
      <AnimatedScreenBackdropStyles.AuraAlt style={auraTwo} />
      <AnimatedScreenBackdropStyles.LeftImage source={leftSource} style={leftAnim} resizeMode="contain" />
      <AnimatedScreenBackdropStyles.RightImage source={rightSource} style={rightAnim} resizeMode="contain" />
    </AnimatedScreenBackdropStyles.Root>
  );
};

export default AnimatedScreenBackdrop;
