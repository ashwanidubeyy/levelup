import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, G, Line } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import { AnimeClockWidgetStyles } from './styles';
import { CLOCK_CONSTANTS, CLOCK_RULES } from '../../constants/clock';
import { TIME } from '../../constants/common';
import { formatBentoDate, formatClock } from '../../utils/date';
import { hexToRgba } from '../../utils/color';

const FACE = moderateScale(168, 0.9);
const CENTER = 100;
const TICKS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

interface AnalogFaceProps {
  now: Date;
  accent: string;
  hand: string;
  tick: string;
}

const AnalogFace = ({ now, accent, hand, tick }: AnalogFaceProps) => {
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hourAngle = (hours + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <Svg width={FACE} height={FACE} viewBox="0 0 200 200">
      <Circle cx={CENTER} cy={CENTER} r={92} stroke={tick} strokeWidth={2} fill="none" />
      {TICKS.map((angle: number) => (
        <G key={`tick-${angle}`} origin={`${CENTER}, ${CENTER}`} rotation={angle}>
          <Line x1={CENTER} y1={14} x2={CENTER} y2={angle % 90 === 0 ? 26 : 20} stroke={tick} strokeWidth={angle % 90 === 0 ? 3 : 1.5} strokeLinecap="round" />
        </G>
      ))}
      <G origin={`${CENTER}, ${CENTER}`} rotation={hourAngle}>
        <Line x1={CENTER} y1={CENTER} x2={CENTER} y2={58} stroke={hand} strokeWidth={5} strokeLinecap="round" />
      </G>
      <G origin={`${CENTER}, ${CENTER}`} rotation={minuteAngle}>
        <Line x1={CENTER} y1={CENTER} x2={CENTER} y2={36} stroke={hand} strokeWidth={3} strokeLinecap="round" />
      </G>
      <G origin={`${CENTER}, ${CENTER}`} rotation={secondAngle}>
        <Line x1={CENTER} y1={112} x2={CENTER} y2={28} stroke={accent} strokeWidth={1.5} strokeLinecap="round" />
      </G>
      <Circle cx={CENTER} cy={CENTER} r={4} fill={accent} />
    </Svg>
  );
};

interface ClockCardProps {
  now: Date;
  image: AppTheme['assets']['backdropArt'][number] | null;
  kind: 'digital' | 'analog';
  fade: Animated.Value;
  pulse: Animated.Value;
}

const AnimeClockWidget = () => {
  const theme = useTheme() as AppTheme;
  const [now, setNow] = useState(() => new Date());
  const [slide, setSlide] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const pool = theme.assets?.backdropArt;
  const poolLength = pool?.length ?? 0;

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), TIME.SECOND_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.35, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    if (poolLength < 2) {
      return undefined;
    }
    const id = setInterval(() => {
      Animated.timing(fade, { toValue: 0, duration: 280, useNativeDriver: true }).start(() => {
        setSlide((prev: number) => prev + 1);
        Animated.timing(fade, { toValue: 1, duration: 280, useNativeDriver: true }).start();
      });
    }, CLOCK_RULES.SLIDE_MS);
    return () => clearInterval(id);
  }, [fade, poolLength]);

  const digitalArt = useMemo(() => (poolLength ? pool?.[slide % poolLength] ?? null : null), [pool, poolLength, slide]);
  const analogArt = useMemo(
    () => (poolLength ? pool?.[(slide + 1) % poolLength] ?? null : null),
    [pool, poolLength, slide],
  );

  return (
    <AnimeClockWidgetStyles.Stack>
      <ClockCard now={now} image={digitalArt} kind="digital" fade={fade} pulse={pulse} />
      <ClockCard now={now} image={analogArt} kind="analog" fade={fade} pulse={pulse} />
    </AnimeClockWidgetStyles.Stack>
  );
};

const ClockCard = ({ now, image, kind, fade, pulse }: ClockCardProps) => {
  const theme = useTheme() as AppTheme;
  const { t } = useTranslation();
  const seconds = now.getSeconds() < 10 ? `0${now.getSeconds()}` : `${now.getSeconds()}`;
  const label = kind === 'analog' ? t(CLOCK_CONSTANTS.ANALOG) : t(CLOCK_CONSTANTS.DIGITAL);

  return (
    <AnimeClockWidgetStyles.Card accessibilityRole="text" accessibilityLabel={`${label} ${t(CLOCK_CONSTANTS.ACCESSIBILITY)}`}>
      {image ? <AnimeClockWidgetStyles.Art source={image} resizeMode="cover" style={{ opacity: fade }} /> : null}
      <AnimeClockWidgetStyles.Shade
        colors={[hexToRgba(theme.bento.bg, 0.2), hexToRgba(theme.bento.bg, 0.82)]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <AnimeClockWidgetStyles.Body>
        <AnimeClockWidgetStyles.TagRow>
          <AnimeClockWidgetStyles.Dot style={{ opacity: pulse }} />
          <AnimeClockWidgetStyles.Tag>{label}</AnimeClockWidgetStyles.Tag>
        </AnimeClockWidgetStyles.TagRow>
        {kind === 'analog' ? (
          <AnimeClockWidgetStyles.Face>
            <AnalogFace now={now} accent={theme.bento.accent} hand={theme.bento.textPrimary} tick={theme.bento.textSecondary} />
          </AnimeClockWidgetStyles.Face>
        ) : (
          <AnimeClockWidgetStyles.TimeRow>
            <AnimeClockWidgetStyles.Time>{formatClock(now.getHours(), now.getMinutes())}</AnimeClockWidgetStyles.Time>
            <AnimeClockWidgetStyles.Seconds>.{seconds}</AnimeClockWidgetStyles.Seconds>
          </AnimeClockWidgetStyles.TimeRow>
        )}
        <AnimeClockWidgetStyles.DateLabel>{formatBentoDate(now)}</AnimeClockWidgetStyles.DateLabel>
      </AnimeClockWidgetStyles.Body>
    </AnimeClockWidgetStyles.Card>
  );
};

export default AnimeClockWidget;
