import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';
import { AnimeClockWidgetStyles } from './styles';
import { CLOCK_CONSTANTS } from '../../constants/clock';
import { formatClock, formatDayLabel, todayKey } from '../../utils/date';

const AnimeClockWidget = () => {
  const theme = useTheme() as AppTheme;
  const { t } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const art = theme.assets?.backdropArt ?? [];
  const image = useMemo(() => {
    if (art.length === 0) {
      return null;
    }
    const index = now.getHours() % art.length;
    return art[index] ?? art[0] ?? null;
  }, [art, now]);

  return (
    <AnimeClockWidgetStyles.Card accessibilityRole="text" accessibilityLabel={t(CLOCK_CONSTANTS.ACCESSIBILITY)}>
      {image ? <AnimeClockWidgetStyles.Art source={image} resizeMode="cover" /> : null}
      <AnimeClockWidgetStyles.Overlay />
      <AnimeClockWidgetStyles.Body>
        <AnimeClockWidgetStyles.Day>{formatDayLabel(todayKey())}</AnimeClockWidgetStyles.Day>
        <AnimeClockWidgetStyles.Time>{formatClock(now.getHours(), now.getMinutes())}</AnimeClockWidgetStyles.Time>
        <AnimeClockWidgetStyles.Seconds>{formatClock(0, now.getSeconds()).slice(3)}</AnimeClockWidgetStyles.Seconds>
        <AnimeClockWidgetStyles.Caption>{t(CLOCK_CONSTANTS.CAPTION)}</AnimeClockWidgetStyles.Caption>
      </AnimeClockWidgetStyles.Body>
    </AnimeClockWidgetStyles.Card>
  );
};

export default AnimeClockWidget;
