import React, { useMemo } from 'react';
import type { BarChartProps, BarDatum } from '../../types';
import { BarChartStyles } from './styles';
import { COLORS } from '../../theme/colors';
import { ratio } from '../../utils/helpers';

const MIN_VISIBLE_RATIO = 0.02;

const barColor = (datum: BarDatum, limit: number): string => {
  if (datum?.muted) {
    return COLORS.PANEL_BORDER;
  }
  return datum?.value > limit ? COLORS.RED_BRIGHT : COLORS.BLUE;
};

const BarChart = ({ data, limit }: BarChartProps) => {
  const maxValue = useMemo(() => {
    let max = limit;
    data?.forEach((datum: BarDatum) => {
      max = Math.max(max, datum?.value ?? 0);
    });
    return Math.max(max, 1);
  }, [data, limit]);

  const limitRatio = ratio(limit, maxValue);

  return (
    <BarChartStyles.Container>
      <BarChartStyles.Plot>
        {data?.map((datum: BarDatum) => {
          const value = datum?.value > 0 ? Math.max(ratio(datum?.value, maxValue), MIN_VISIBLE_RATIO) : 0;
          return (
            <BarChartStyles.Column key={datum?.key}>
              <BarChartStyles.Spacer $flex={1 - value} />
              <BarChartStyles.Bar $flex={value} $color={barColor(datum, limit)} />
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
