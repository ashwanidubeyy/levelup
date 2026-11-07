import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { RootScreenProps } from '../../navigation/AppNavigator';
import PageContainer from '../../components/PageContainer';
import KeybordView from '../../components/KeybordView';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import ToggleRow from '../../components/ToggleRow';
import Stepper from '../../components/Stepper';
import DateNavigator from '../../components/DateNavigator';
import { PlannerStyles } from './styles';
import type { TodoItem } from '../../types';
import { PLANNER_CONSTANTS, PLANNER_RULES } from '../../constants/planner';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { addTodo, clearDayTodos, removeTodo, setPlannerReminder, updateTodo } from '../../store/slices/todoSlice';
import { addDays, formatClock, formatDayLabel, todayKey } from '../../utils/date';
import { doneCountForDay, todosForDay } from '../../utils/todos';
import { generateId } from '../../utils/helpers';

type Props = RootScreenProps<'Planner'>;

const Planner = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const todoState = useAppSelector(state => state?.todos);
  const [day, setDay] = useState(todayKey());
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const dayTodos = useMemo(() => todosForDay(todoState?.items ?? [], day), [todoState?.items, day]);
  const doneCount = doneCountForDay(todoState?.items ?? [], day);

  const handleAdd = () => {
    const value = title?.trim() ?? '';
    if (!value) {
      setError(PLANNER_CONSTANTS.VALIDATION.TITLE);
      return;
    }
    const item: TodoItem = {
      id: generateId(),
      day,
      title: value,
      done: false,
      createdAt: Date.now(),
    };
    dispatch(addTodo(item));
    setTitle('');
    setError('');
  };

  const handleToggle = (item: TodoItem) => {
    dispatch(updateTodo({ ...item, done: !item?.done }));
  };

  const handleStartEdit = (item: TodoItem) => {
    setEditingId(item?.id ?? null);
    setEditTitle(item?.title ?? '');
  };

  const handleSaveEdit = (item: TodoItem) => {
    const value = editTitle?.trim() ?? '';
    if (!value) {
      setError(PLANNER_CONSTANTS.VALIDATION.TITLE);
      return;
    }
    dispatch(updateTodo({ ...item, title: value }));
    setEditingId(null);
    setEditTitle('');
    setError('');
  };

  const handleResetDay = () => {
    Alert.alert(t(PLANNER_CONSTANTS.RESET_TITLE), t(PLANNER_CONSTANTS.RESET_MESSAGE, { day: formatDayLabel(day) }), [
      { text: t(COMMON_CONSTANTS.ACTIONS.CANCEL), style: 'cancel', onPress: () => undefined },
      {
        text: t(COMMON_CONSTANTS.ACTIONS.CLEAR),
        style: 'destructive',
        onPress: () => {
          dispatch(clearDayTodos(day));
          setEditingId(null);
        },
      },
    ]);
  };

  const handleReminder = (hour: number, minute: number, enabled: boolean) => {
    dispatch(setPlannerReminder({ hour, minute, enabled }));
  };

  return (
    <KeybordView>
      <PageContainer animatedBackground>
        <ScreenHeader
          title={t(PLANNER_CONSTANTS.TITLE)}
          subtitle={t(PLANNER_CONSTANTS.SUBTITLE)}
          onBack={navigation.goBack}
          backLabel={t(COMMON_CONSTANTS.ACTIONS.BACK)}
        />
        <SystemPanel title={t(PLANNER_CONSTANTS.ADD)} variant="monarch">
          <DateNavigator
            label={formatDayLabel(day)}
            onPrevious={() => setDay(addDays(day, -1))}
            onNext={() => setDay(addDays(day, 1))}
            nextDisabled={day >= todayKey()}
            previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
            nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
          />
          <PlannerStyles.Meta>
            {t(PLANNER_CONSTANTS.PROGRESS, { done: doneCount, total: dayTodos.length })}
          </PlannerStyles.Meta>
          <InputField
            label={t(PLANNER_CONSTANTS.TASK)}
            value={title}
            onChangeText={setTitle}
            placeholder={t(PLANNER_CONSTANTS.TASK_PLACEHOLDER)}
            maxLength={PLANNER_RULES.TITLE_MAX}
            error={error === PLANNER_CONSTANTS.VALIDATION.TITLE ? t(error) : undefined}
          />
          <PlannerStyles.Block>
            <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.ADD)} onPress={handleAdd} />
          </PlannerStyles.Block>
          {dayTodos.length === 0 ? <PlannerStyles.Empty>{t(PLANNER_CONSTANTS.EMPTY)}</PlannerStyles.Empty> : null}
          {dayTodos.map((item: TodoItem) =>
            editingId === item?.id ? (
              <PlannerStyles.ItemBlock key={item?.id}>
                <InputField
                  label={t(PLANNER_CONSTANTS.TASK)}
                  value={editTitle}
                  onChangeText={setEditTitle}
                  placeholder={t(PLANNER_CONSTANTS.TASK_PLACEHOLDER)}
                  maxLength={PLANNER_RULES.TITLE_MAX}
                  error={error === PLANNER_CONSTANTS.VALIDATION.TITLE ? t(error) : undefined}
                />
                <PlannerStyles.Actions>
                  <PrimaryButton
                    label={t(COMMON_CONSTANTS.ACTIONS.CANCEL)}
                    onPress={() => setEditingId(null)}
                    variant="ghost"
                    compact
                  />
                  <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.SAVE)} onPress={() => handleSaveEdit(item)} compact />
                </PlannerStyles.Actions>
              </PlannerStyles.ItemBlock>
            ) : (
              <PlannerStyles.ItemBlock key={item?.id}>
                <PlannerStyles.Row>
                  <PlannerStyles.Title $done={item?.done} numberOfLines={3}>
                    {item?.title}
                  </PlannerStyles.Title>
                  <PrimaryButton
                    label={item?.done ? t(PLANNER_CONSTANTS.DONE) : t(PLANNER_CONSTANTS.OPEN)}
                    onPress={() => handleToggle(item)}
                    variant={item?.done ? 'ghost' : 'primary'}
                    compact
                  />
                </PlannerStyles.Row>
                <PlannerStyles.Actions>
                  <PrimaryButton label={t(PLANNER_CONSTANTS.EDIT)} onPress={() => handleStartEdit(item)} variant="ghost" compact />
                  <PrimaryButton
                    label={t(COMMON_CONSTANTS.ACTIONS.DELETE)}
                    onPress={() => dispatch(removeTodo(item?.id))}
                    variant="ghost"
                    compact
                  />
                </PlannerStyles.Actions>
              </PlannerStyles.ItemBlock>
            ),
          )}
          {dayTodos.length > 0 ? (
            <PlannerStyles.Block>
              <PrimaryButton label={t(PLANNER_CONSTANTS.RESET_DAY)} onPress={handleResetDay} variant="danger" compact />
            </PlannerStyles.Block>
          ) : null}
        </SystemPanel>
        <SystemPanel title={t(PLANNER_CONSTANTS.REMINDER)} variant="system">
          <ToggleRow
            label={t(PLANNER_CONSTANTS.REMINDER)}
            hint={t(PLANNER_CONSTANTS.REMINDER_HINT)}
            value={!!todoState?.reminderEnabled}
            onValueChange={enabled =>
              handleReminder(todoState?.reminderHour ?? PLANNER_RULES.REMINDER_HOUR, todoState?.reminderMinute ?? 0, enabled)
            }
          />
          <Stepper
            label={t(PLANNER_CONSTANTS.HOUR)}
            valueLabel={formatClock(todoState?.reminderHour ?? PLANNER_RULES.REMINDER_HOUR, todoState?.reminderMinute ?? 0)}
            value={todoState?.reminderHour ?? PLANNER_RULES.REMINDER_HOUR}
            min={0}
            max={23}
            step={1}
            onChange={hour =>
              handleReminder(hour, todoState?.reminderMinute ?? 0, !!todoState?.reminderEnabled)
            }
          />
          <Stepper
            label={t(PLANNER_CONSTANTS.MINUTE)}
            valueLabel={formatClock(todoState?.reminderHour ?? PLANNER_RULES.REMINDER_HOUR, todoState?.reminderMinute ?? 0)}
            value={todoState?.reminderMinute ?? 0}
            min={0}
            max={55}
            step={5}
            onChange={minute =>
              handleReminder(todoState?.reminderHour ?? PLANNER_RULES.REMINDER_HOUR, minute, !!todoState?.reminderEnabled)
            }
          />
        </SystemPanel>
      </PageContainer>
    </KeybordView>
  );
};

export default Planner;
