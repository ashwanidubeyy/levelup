import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import type { BarChartProps, BarDatum } from '../../types';
import { BarChartStyles } from './styles';
import { ratio } from '../../utils/helpers';
import type { AppTheme } from '../../theme/types';

const MIN_VISIBLE_RATIO = 0.02;

const BarChart = ({ data, limit }: BarChartProps) => {
  const theme = useTheme() as AppTheme;
  const maxValue = useMemo(() => {
    let max = limit;
    data?.forEach((datum: BarDatum) => {
      max = Math.max(max, datum?.value ?? 0);
    });
    return Math.max(max, 1);
  }, [data, limit]);

  const limitRatio = ratio(limit, maxValue);

  const barColor = (datum: BarDatum): string => {
    if (datum?.muted) {
      return theme.colors.PANEL_BORDER;
    }
    return datum?.value > limit ? theme.colors.RED_BRIGHT : theme.colors.BLUE;
  };

  return (
    <BarChartStyles.Container>
      <BarChartStyles.Plot>
        {data?.map((datum: BarDatum) => {
          const value = datum?.value > 0 ? Math.max(ratio(datum?.value, maxValue), MIN_VISIBLE_RATIO) : 0;
          return (
            <BarChartStyles.Column key={datum?.key}>
              <BarChartStyles.Spacer $flex={1 - value} />
              <BarChartStyles.Bar $flex={value} $color={barColor(datum)} />
            </BarChartStyles.Column>
          );
        })}
        {limit > 0 ? <BarChartStyles.LimitLine $bottom={BarChartStyles.CHART_HEIGHT * limitRatio} /> : null}
      </BarChartStyles.Plot>
      <BarChartStyles.Labels>
        {data?.map((datum: BarDatum) => (
          <BarChartStyles.LabelSlot key={`label-${datum?.key}`}>
            {datum?.label ? <BarChartStyles.Label>{datum?.label}</BarChartStyles.Label> : null}
          </BarChartStyles.LabelSlot>
        ))}
      </BarChartStyles.Labels>
    </BarChartStyles.Container>
  );
};

export default BarChart;
