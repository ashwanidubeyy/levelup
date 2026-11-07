import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GradientView from '../GradientView';
import AnimatedScreenBackdrop from '../AnimatedScreenBackdrop';
import type { PageContainerProps } from '../../types';
import { PageContainerStyles } from './styles';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

const PageContainer = ({
  children,
  scrollable = true,
  withTopInset = true,
  withBottomInset = false,
  animatedBackground = false,
}: PageContainerProps) => {
  const theme = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX, y: scrollY } } }],
    { useNativeDriver: false },
  );

  const content = (
    <PageContainerStyles.Content
      $top={withTopInset ? insets.top : 0}
      $bottom={withBottomInset ? insets.bottom : 0}
      $grow={!scrollable}
    >
      {children}
    </PageContainerStyles.Content>
  );

  return (
    <PageContainerStyles.Container>
      <GradientView colors={[...theme.gradients.SCREEN]} fill />
      {animatedBackground ? <AnimatedScreenBackdrop scrollX={scrollX} scrollY={scrollY} /> : null}
      {scrollable ? (
        <PageContainerStyles.Scroll
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={animatedBackground ? handleScroll : undefined}
          scrollEventThrottle={16}
        >
          {content}
        </PageContainerStyles.Scroll>
      ) : (
        content
      )}
    </PageContainerStyles.Container>
  );
};

export default PageContainer;
