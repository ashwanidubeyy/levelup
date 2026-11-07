import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import { AnimatedScreenBackdropStyles } from './styles';

interface Props {
  scrollX?: Animated.Value;
  scrollY?: Animated.Value;
}

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const DOT_OFFSETS = [
  { left: 0.12, top: 0.22 },
  { left: 0.78, top: 0.18 },
  { left: 0.64, top: 0.62 },
  { left: 0.22, top: 0.74 },
] as const;

const AnimatedScreenBackdrop = ({ scrollX, scrollY }: Props) => {
  const theme = useTheme() as AppTheme;
  const drift = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const zero = useRef(new Animated.Value(0)).current;
  const offsetX = scrollX ?? zero;
  const offsetY = scrollY ?? zero;

  const { leftSource, rightSource, hasArt } = useMemo(() => {
    const pool = theme.assets.backdropArt ?? [];
    const len = pool.length;
    if (len === 0) {
      return { leftSource: null, rightSource: null, hasArt: false };
    }
    const i = Math.floor(Math.random() * len);
    let j = len > 1 ? Math.floor(Math.random() * len) : 0;
    if (len > 1 && j === i) {
      j = (j + 1) % len;
    }
    return { leftSource: pool[i], rightSource: pool[j], hasArt: true };
  }, [theme.id]);

  useEffect(() => {
    const driftMs = theme.motion.backdropDriftMs;
    const shimmerMs = theme.motion.backdropShimmerMs;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: driftMs, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(drift, { toValue: 0, duration: driftMs, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ]),
    );
    const sweep = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: shimmerMs,
        easing: Easing.linear,
        useNativeDriver: false,
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
      {
        translateX: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [-14, 18] }),
          interactiveX,
        ),
      },
      {
        translateY: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [10, -12] }),
          interactiveY,
        ),
      },
      {
        scale: drift.interpolate({ inputRange: [0, 1], outputRange: [1, theme.motion.auraPulseMax] }),
      },
    ],
  };

  const auraTwo = {
    transform: [
      {
        translateX: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [24, -10] }),
          Animated.multiply(interactiveX, 1.15),
        ),
      },
      {
        translateY: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [-16, 20] }),
          Animated.multiply(interactiveY, 1.08),
        ),
      },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.75] }),
  };

  const leftAnim = {
    transform: [
      {
        translateY: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [0, -12] }),
          Animated.multiply(interactiveY, 0.75),
        ),
      },
      { translateX: Animated.multiply(interactiveX, 0.55) },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.42] }),
  };

  const rightAnim = {
    transform: [
      {
        translateY: Animated.add(
          drift.interpolate({ inputRange: [0, 1], outputRange: [0, 14] }),
          Animated.multiply(interactiveY, 0.5),
        ),
      },
      { translateX: Animated.multiply(interactiveX, -0.7) },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.26, 0.38] }),
  };

  const shimmerAnim = {
    transform: [
      {
        translateX: Animated.add(
          shimmer.interpolate({ inputRange: [0, 1], outputRange: [-SCREEN_W * 0.4, SCREEN_W * 0.9] }),
          interactiveX,
        ),
      },
    ],
  };

  const dotAnims = DOT_OFFSETS.map((spot: (typeof DOT_OFFSETS)[number], index: number) => ({
    style: {
      left: SCREEN_W * spot.left,
      top: SCREEN_H * spot.top,
      transform: [
        {
          translateX: Animated.add(
            drift.interpolate({
              inputRange: [0, 1],
              outputRange: index % 2 === 0 ? [-6, 6] : [5, -5],
            }),
            Animated.multiply(interactiveX, 0.35 + index * 0.05),
          ),
        },
        {
          translateY: Animated.add(
            drift.interpolate({
              inputRange: [0, 1],
              outputRange: index % 2 === 0 ? [4, -4] : [-5, 5],
            }),
            Animated.multiply(interactiveY, 0.3),
          ),
        },
      ],
      opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.55] }),
    },
  }));

  const bandAnim = {
    width: SCREEN_W * 0.84,
    left: SCREEN_W * 0.08,
    top: SCREEN_H * 0.42,
    transform: [
      { translateX: Animated.multiply(interactiveX, 0.4) },
      { scaleX: drift.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.05] }) },
    ],
    opacity: drift.interpolate({ inputRange: [0, 1], outputRange: [0.2, 0.45] }),
  };

  return (
    <AnimatedScreenBackdropStyles.Root pointerEvents="none">
      <AnimatedScreenBackdropStyles.Shimmer style={shimmerAnim} />
      <AnimatedScreenBackdropStyles.Aura style={[auraOne, { top: SCREEN_H * 0.08, left: -SCREEN_W * 0.18 }]} />
      <AnimatedScreenBackdropStyles.AuraAlt style={[auraTwo, { bottom: SCREEN_H * 0.12, right: -SCREEN_W * 0.12 }]} />
      {dotAnims.map((item: (typeof dotAnims)[number], index: number) => (
        <AnimatedScreenBackdropStyles.PatternDot key={`dot-${index}`} style={item.style} />
      ))}
      <AnimatedScreenBackdropStyles.PatternBand style={bandAnim} />
      {hasArt && leftSource ? (
        <AnimatedScreenBackdropStyles.LeftImage source={leftSource} style={leftAnim} resizeMode="contain" />
      ) : null}
      {hasArt && rightSource ? (
        <AnimatedScreenBackdropStyles.RightImage source={rightSource} style={rightAnim} resizeMode="contain" />
      ) : null}
    </AnimatedScreenBackdropStyles.Root>
  );
};

export default AnimatedScreenBackdrop;
