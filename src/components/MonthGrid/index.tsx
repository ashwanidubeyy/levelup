import React from 'react';
import type { MonthGridProps } from '../../types';
import { MonthGridStyles } from './styles';
import { formatShortDay } from '../../utils/date';

const weekKey = (week: Array<string | null>): string => {
  const days = week?.filter((day: string | null): day is string => !!day) ?? [];
  return days.length > 0 ? days.join('-') : 'empty-week';
};

const MonthGrid = ({ weeks, weekdayLabels, selected, today, marked, onSelect }: MonthGridProps) => (
  <MonthGridStyles.Container>
    <MonthGridStyles.Weekdays>
      {weekdayLabels?.map((label: string, index: number) => (
        <MonthGridStyles.Weekday key={`${label}-${index}`}>{label}</MonthGridStyles.Weekday>
      ))}
    </MonthGridStyles.Weekdays>
    {weeks?.map((week: Array<string | null>) => {
      const key = weekKey(week);
      return (
        <MonthGridStyles.Week key={key}>
          {week?.map((day: string | null, index: number) =>
            day ? (
              <MonthGridStyles.Cell
                key={day}
                $selected={day === selected}
                $today={day === today}
                onPress={() => onSelect(day)}
                accessibilityRole="button"
                accessibilityLabel={day}
              >
                <MonthGridStyles.Day $selected={day === selected}>{formatShortDay(day)}</MonthGridStyles.Day>
                {marked?.includes(day) ? <MonthGridStyles.Dot /> : null}
              </MonthGridStyles.Cell>
            ) : (
              <MonthGridStyles.Spacer key={`${key}-pad-${index}`} />
            ),
          )}
        </MonthGridStyles.Week>
      );
    })}
  </MonthGridStyles.Container>
);

export default MonthGrid;
