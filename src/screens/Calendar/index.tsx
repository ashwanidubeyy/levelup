import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import KeybordView from '../../components/KeybordView';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import DateNavigator from '../../components/DateNavigator';
import MonthGrid from '../../components/MonthGrid';
import InputField from '../../components/InputField';
import SegmentedControl from '../../components/SegmentedControl';
import Stepper from '../../components/Stepper';
import PrimaryButton from '../../components/PrimaryButton';
import { CalendarStyles } from './styles';
import type { IndiaCalendarEvent, Reminder, SegmentOption } from '../../types';
import { CALENDAR_CONSTANTS, REMINDER_REPEAT_OPTIONS, REMINDER_RULES } from '../../constants/reminders';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { addReminder, removeReminder } from '../../store/slices/reminderSlice';
import { formatClock, formatMonthLabel, monthOf, shiftMonth, todayKey } from '../../utils/date';
import { markedDaysInMonth, monthWeeks } from '../../utils/calendar';
import { holidaysInMonth, holidaysOnDay } from '../../utils/indiaCalendar';
import { remindersOnDay } from '../../utils/reminders';
import { generateId } from '../../utils/helpers';

type Props = RootScreenProps<'Calendar'>;

const Calendar = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state?.reminders?.items);
  const requested = route?.params?.day ?? todayKey();
  const initial = monthOf(requested);
  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);
  const [selected, setSelected] = useState(requested);
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState<number>(REMINDER_RULES.DEFAULT_HOUR);
  const [minute, setMinute] = useState<number>(REMINDER_RULES.DEFAULT_MINUTE);
  const [repeat, setRepeat] = useState<string>(REMINDER_RULES.ONCE);
  const [error, setError] = useState('');

  const weeks = useMemo(() => monthWeeks(year, month), [year, month]);
  const marked = useMemo(() => {
    const reminderDays = markedDaysInMonth(items ?? [], year, month);
    const holidayDays = holidaysInMonth(year, month).map((event: IndiaCalendarEvent) => event?.day ?? '');
    return Array.from(new Set([...reminderDays, ...holidayDays]));
  }, [items, year, month]);
  const dayItems = remindersOnDay(items ?? [], selected);
  const dayHolidays = holidaysOnDay(selected);
  const weekdays = CALENDAR_CONSTANTS.WEEKDAYS.map((key: string) => t(key));
  const repeatOptions: SegmentOption[] = REMINDER_REPEAT_OPTIONS.map(
    (option: (typeof REMINDER_REPEAT_OPTIONS)[number]) => ({
      label: t(option.labelKey),
      value: option.value,
    }),
  );

  useEffect(() => {
    const day = route?.params?.day;
    if (!day) {
      return;
    }
    const next = monthOf(day);
    setSelected(day);
    setYear(next.year);
    setMonth(next.month);
  }, [route?.params?.day]);

  const handleMonth = (delta: number) => {
    const next = shiftMonth(year, month, delta);
    setYear(next.year);
    setMonth(next.month);
  };

  const handleSave = () => {
    const name = title?.trim() ?? '';
    if (!name) {
      setError(CALENDAR_CONSTANTS.VALIDATION.TITLE);
      return;
    }
    const reminder: Reminder = {
      id: generateId(),
      title: name,
      day: selected,
      hour,
      minute,
      repeat: repeat === REMINDER_RULES.DAILY ? 'daily' : 'once',
      createdAt: Date.now(),
    };
    dispatch(addReminder(reminder));
    setTitle('');
    setError('');
  };

  return (
    <KeybordView>
      <PageContainer>
        <ScreenHeader
          title={t(CALENDAR_CONSTANTS.TITLE)}
          subtitle={t(CALENDAR_CONSTANTS.SUBTITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
        />
        <SystemPanel>
          <DateNavigator
            label={formatMonthLabel(year, month)}
            onPrevious={() => handleMonth(-1)}
            onNext={() => handleMonth(1)}
            nextDisabled={false}
            previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
            nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
          />
          <MonthGrid
            weeks={weeks}
            weekdayLabels={weekdays}
            selected={selected}
            today={todayKey()}
            marked={marked}
            onSelect={setSelected}
          />
        </SystemPanel>
        <SystemPanel title={t(CALENDAR_CONSTANTS.ADD)} variant="monarch">
          <InputField
            label={t(CALENDAR_CONSTANTS.NAME)}
            value={title}
            onChangeText={setTitle}
            placeholder={t(CALENDAR_CONSTANTS.NAME_PLACEHOLDER)}
            error={error ? t(error) : undefined}
          />
          <CalendarStyles.Block>
            <SegmentedControl options={repeatOptions} value={repeat} onChange={setRepeat} />
          </CalendarStyles.Block>
          <Stepper
            label={t(CALENDAR_CONSTANTS.HOUR)}
            valueLabel={formatClock(hour, minute)}
            value={hour}
            min={0}
            max={REMINDER_RULES.HOUR_MAX}
            step={1}
            onChange={setHour}
          />
          <Stepper
            label={t(CALENDAR_CONSTANTS.MINUTE)}
            valueLabel={formatClock(hour, minute)}
            value={minute}
            min={0}
            max={REMINDER_RULES.MINUTE_MAX}
            step={REMINDER_RULES.MINUTE_STEP}
            onChange={setMinute}
          />
          <CalendarStyles.Block>
            <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.SAVE)} onPress={handleSave} />
          </CalendarStyles.Block>
          {dayHolidays.map((event: IndiaCalendarEvent) => (
            <CalendarStyles.Row key={event?.id}>
              <CalendarStyles.Title numberOfLines={1}>{t(event?.nameKey ?? '')}</CalendarStyles.Title>
              <CalendarStyles.When>{t(CALENDAR_CONSTANTS.HOLIDAY)}</CalendarStyles.When>
            </CalendarStyles.Row>
          ))}
          {dayItems.length === 0 && dayHolidays.length === 0 ? (
            <CalendarStyles.Empty>{t(CALENDAR_CONSTANTS.EMPTY)}</CalendarStyles.Empty>
          ) : null}
          {dayItems.map((reminder: Reminder) => (
            <CalendarStyles.Row key={reminder?.id}>
              <CalendarStyles.Title numberOfLines={1}>{reminder?.title}</CalendarStyles.Title>
              <CalendarStyles.When>
                {reminder?.repeat === 'daily'
                  ? t(CALENDAR_CONSTANTS.WHEN_DAILY, { time: formatClock(reminder?.hour ?? 0, reminder?.minute ?? 0) })
                  : t(CALENDAR_CONSTANTS.WHEN, { time: formatClock(reminder?.hour ?? 0, reminder?.minute ?? 0) })}
              </CalendarStyles.When>
              <PrimaryButton
                label={t(COMMON_CONSTANTS.ACTIONS.DELETE)}
                onPress={() => dispatch(removeReminder(reminder?.id))}
                variant="ghost"
                compact
              />
            </CalendarStyles.Row>
          ))}
        </SystemPanel>
      </PageContainer>
    </KeybordView>
  );
};

export default Calendar;
