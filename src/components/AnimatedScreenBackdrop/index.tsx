import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { AnimatedScreenBackdropStyles } from './styles';
import { QUOTE_FALLBACK_ART } from '../../constants/images';

const AnimatedScreenBackdrop = () => {
  const drift = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  const { leftSource, rightSource } = useMemo(() => {
    const pool = QUOTE_FALLBACK_ART;
    const len = pool.length;
    const i = len > 0 ? Math.floor(Math.random() * len) : 0;
    let j = len > 1 ? Math.floor(Math.random() * len) : 0;
    if (len > 1 && j === i) {
      j = (j + 1) % len;
    }
    return { leftSource: pool[i], rightSource: pool[j] };
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 14000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(drift, { toValue: 0, duration: 14000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const sweep = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 9000,
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
  }, [drift, shimmer]);

  const auraOne = {
    transform: [
      {
        translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [-18, 22] }),
      },
      {
        translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [12, -14] }),
      },
      {
        scale: drift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }),
      },
    ],
  };

  const auraTwo = {
    transform: [
      {
        translateX: drift.interpolate({ inputRange: [0, 1], outputRange: [28, -12] }),
      },
      {
        translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [-20, 24] }),
      },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0.85] }),
  };

  const leftAnim = {
    transform: [
      {
        translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [0, -16] }),
      },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0.44] }),
  };

  const rightAnim = {
    transform: [
      {
        translateY: drift.interpolate({ inputRange: [0, 1], outputRange: [0, 18] }),
      },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0.4] }),
  };

  const shimmerAnim = {
    transform: [
      {
        translateX: shimmer.interpolate({ inputRange: [0, 1], outputRange: [-400, 800] }),
      },
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
