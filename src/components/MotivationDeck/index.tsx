import React, { useRef, useState } from 'react';
import { Animated, PanResponder } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import { moderateScale } from 'react-native-size-matters';
import type { AppTheme } from '../../theme/types';
import { MotivationDeckStyles } from './styles';
import { HOME_CONSTANTS } from '../../constants/screens';
import { COMMON_CONSTANTS } from '../../constants/common';
import { QUOTES } from '../../constants/quotes';
import { quoteAt, quoteIndexForToday } from '../../utils/helpers';

const SWIPE_DISTANCE = moderateScale(120, 0.9);
const EXIT_DISTANCE = moderateScale(420, 0.9);

interface MotivationDeckProps {
  full?: boolean;
}

const MotivationDeck = ({ full = false }: MotivationDeckProps) => {
  const theme = useTheme() as AppTheme;
  const { t } = useTranslation();
  const [index, setIndex] = useState(quoteIndexForToday);
  const translateX = useRef(new Animated.Value(0)).current;
  const indexRef = useRef(index);
  indexRef.current = index;

  const advance = () => {
    setIndex((prev: number) => prev + 1);
    translateX.setValue(0);
  };

  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gesture) =>
        Math.abs(gesture.dx) > moderateScale(8, 0.9) && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: Animated.event([null, { dx: translateX }], { useNativeDriver: false }),
      onPanResponderRelease: (_event, gesture) => {
        if (Math.abs(gesture.dx) < moderateScale(8, 0.9) && Math.abs(gesture.dy) < moderateScale(8, 0.9)) {
          advanceRef.current();
          return;
        }
        if (Math.abs(gesture.dx) > SWIPE_DISTANCE) {
          const direction = gesture.dx > 0 ? 1 : -1;
          Animated.timing(translateX, {
            toValue: direction * EXIT_DISTANCE,
            duration: 220,
            useNativeDriver: false,
          }).start(() => advanceRef.current());
          return;
        }
        Animated.spring(translateX, { toValue: 0, useNativeDriver: false, bounciness: 8 }).start();
      },
    }),
  ).current;

  const rotate = translateX.interpolate({
    inputRange: [-EXIT_DISTANCE, 0, EXIT_DISTANCE],
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  const current = quoteAt(index, theme.assets.backdropArt);
  const upcoming = quoteAt(index + 1, theme.assets.backdropArt);
  const position = ((index % QUOTES.length) + QUOTES.length) % QUOTES.length;

  return (
    <MotivationDeckStyles.Section>
      <MotivationDeckStyles.Header>
        {full ? (
          <MotivationDeckStyles.Title>
            {t(HOME_CONSTANTS.QUOTE_HINT, { current: position + 1, total: QUOTES.length })}
          </MotivationDeckStyles.Title>
        ) : (
          <MotivationDeckStyles.Title>{t(HOME_CONSTANTS.MOTIVATION_TITLE)}</MotivationDeckStyles.Title>
        )}
        <MotivationDeckStyles.Refresh onPress={advance} accessibilityRole="button">
          {t(COMMON_CONSTANTS.ACTIONS.REFRESH)}
        </MotivationDeckStyles.Refresh>
      </MotivationDeckStyles.Header>
      <MotivationDeckStyles.Stage $full={full}>
        <MotivationDeckStyles.BackCard>
          {upcoming.image ? <MotivationDeckStyles.Art source={upcoming.image} resizeMode="contain" /> : null}
          <MotivationDeckStyles.Scrim />
        </MotivationDeckStyles.BackCard>
        <MotivationDeckStyles.Card
          style={{ transform: [{ translateX }, { rotate }] }}
          {...pan.panHandlers}
          accessibilityRole="button"
          accessibilityLabel={t(current.textKey)}
        >
          {current.image ? <MotivationDeckStyles.Art source={current.image} resizeMode="contain" /> : null}
          <MotivationDeckStyles.Scrim />
          <MotivationDeckStyles.Copy>
            <MotivationDeckStyles.Quote>{t(current.textKey)}</MotivationDeckStyles.Quote>
            <MotivationDeckStyles.Author>{t(current.authorKey)}</MotivationDeckStyles.Author>
          </MotivationDeckStyles.Copy>
        </MotivationDeckStyles.Card>
      </MotivationDeckStyles.Stage>
      <MotivationDeckStyles.Hint>{t(HOME_CONSTANTS.MOTIVATION_HINT)}</MotivationDeckStyles.Hint>
      <MotivationDeckStyles.Hint>
        {t(HOME_CONSTANTS.QUOTE_HINT, { current: position + 1, total: QUOTES.length })}
      </MotivationDeckStyles.Hint>
    </MotivationDeckStyles.Section>
  );
};

export default MotivationDeck;
