import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import KeybordView from '../../components/KeybordView';
import ScreenHeader from '../../components/ScreenHeader';
import SystemPanel from '../../components/SystemPanel';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import StatBar from '../../components/StatBar';
import Stepper from '../../components/Stepper';
import ToggleRow from '../../components/ToggleRow';
import DateNavigator from '../../components/DateNavigator';
import { BudgetStyles } from './styles';
import type { Expense } from '../../types';
import { BUDGET_CONSTANTS, BUDGET_RULES } from '../../constants/budget';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  addExpense,
  clearMonthExpenses,
  removeExpense,
  setMonthlyBudget,
  setNightReminder,
  updateExpense,
} from '../../store/slices/budgetSlice';
import { addDays, formatClock, formatDayLabel, formatMonthLabel, monthOf, todayKey } from '../../utils/date';
import { expensesForDay, expensesForMonth, formatAmount, monthKeyFromDay, parseAmount, sumExpenses } from '../../utils/money';
import { projectedMonthSpend, safeDailyForRest } from '../../utils/budgetPlan';
import { generateId, ratio } from '../../utils/helpers';

const Budget = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const budget = useAppSelector(state => state?.budget);
  const [day, setDay] = useState(todayKey());
  const [budgetDraft, setBudgetDraft] = useState(budget?.monthlyBudget ? `${budget.monthlyBudget}` : '');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [editError, setEditError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editNote, setEditNote] = useState('');
  const monthExpenses = useMemo(
    () => expensesForMonth(budget?.expenses ?? [], monthKeyFromDay(day)),
    [budget?.expenses, day],
  );
  const dayExpenses = useMemo(() => expensesForDay(budget?.expenses ?? [], day), [budget?.expenses, day]);
  const spent = sumExpenses(monthExpenses);
  const monthly = budget?.monthlyBudget ?? 0;
  const remaining = monthly - spent;
  const over = monthly > 0 && remaining < 0;
  const loggedToday = expensesForDay(budget?.expenses ?? [], todayKey()).length > 0;
  const monthKey = monthKeyFromDay(day);
  const { year: budgetYear, month: budgetMonth } = monthOf(day);
  const projected = monthly > 0 ? projectedMonthSpend(spent, day) : 0;
  const dailySafe = monthly > 0 ? safeDailyForRest(Math.max(0, remaining), day) : 0;

  const handleSaveBudget = () => {
    const value = parseAmount(budgetDraft);
    if (value <= 0) {
      setError(BUDGET_CONSTANTS.VALIDATION.BUDGET);
      return;
    }
    setError('');
    dispatch(setMonthlyBudget(value));
  };

  const handleAddExpense = () => {
    const value = parseAmount(amount);
    if (value <= 0) {
      setError(BUDGET_CONSTANTS.VALIDATION.AMOUNT);
      return;
    }
    const expense: Expense = {
      id: generateId(),
      day,
      amount: value,
      note: note?.trim() ?? '',
      createdAt: Date.now(),
    };
    dispatch(addExpense(expense));
    setAmount('');
    setNote('');
    setError('');
  };

  const handleStartEdit = (expense: Expense) => {
    setEditingId(expense?.id ?? null);
    setEditAmount(formatAmount(expense?.amount ?? 0));
    setEditNote(expense?.note ?? '');
    setEditError('');
  };

  const handleSaveEdit = (expense: Expense) => {
    const value = parseAmount(editAmount);
    if (value <= 0) {
      setEditError(BUDGET_CONSTANTS.VALIDATION.AMOUNT);
      return;
    }
    dispatch(
      updateExpense({
        ...expense,
        amount: value,
        note: editNote?.trim() ?? '',
      }),
    );
    setEditingId(null);
    setEditAmount('');
    setEditNote('');
    setEditError('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditAmount('');
    setEditNote('');
    setEditError('');
  };

  const handleResetMonth = () => {
    const label = formatMonthLabel(budgetYear, budgetMonth);
    Alert.alert(t(BUDGET_CONSTANTS.RESET_TITLE), t(BUDGET_CONSTANTS.RESET_MESSAGE, { month: label }), [
      { text: t(COMMON_CONSTANTS.ACTIONS.CANCEL), style: 'cancel', onPress: () => undefined },
      {
        text: t(COMMON_CONSTANTS.ACTIONS.CLEAR),
        style: 'destructive',
        onPress: () => {
          dispatch(clearMonthExpenses(monthKey));
          handleCancelEdit();
        },
      },
    ]);
  };

  const handleNight = (hour: number, minute: number, enabled: boolean) => {
    dispatch(
      setNightReminder({
        hour,
        minute,
        enabled,
      }),
    );
  };

  return (
    <KeybordView>
      <PageContainer animatedBackground>
        <ScreenHeader title={t(BUDGET_CONSTANTS.TITLE)} subtitle={t(BUDGET_CONSTANTS.SUBTITLE)} />
        <SystemPanel title={t(BUDGET_CONSTANTS.MONTHLY)} variant={over ? 'danger' : 'monarch'}>
          <InputField
            label={t(BUDGET_CONSTANTS.MONTHLY)}
            value={budgetDraft}
            onChangeText={setBudgetDraft}
            placeholder={t(BUDGET_CONSTANTS.MONTHLY_PLACEHOLDER)}
            keyboardType="decimal-pad"
            error={error === BUDGET_CONSTANTS.VALIDATION.BUDGET ? t(error) : undefined}
          />
          <BudgetStyles.Block>
            <PrimaryButton label={t(BUDGET_CONSTANTS.SAVE_BUDGET)} onPress={handleSaveBudget} compact />
          </BudgetStyles.Block>
          <BudgetStyles.Summary $danger={over}>
            {monthly > 0
              ? t(over ? BUDGET_CONSTANTS.OVER : BUDGET_CONSTANTS.LEFT, {
                  spent: formatAmount(spent),
                  left: formatAmount(Math.abs(remaining)),
                  budget: formatAmount(monthly),
                })
              : t(BUDGET_CONSTANTS.NO_BUDGET, { spent: formatAmount(spent) })}
          </BudgetStyles.Summary>
          {monthly > 0 ? <StatBar progress={ratio(spent, monthly)} variant={over ? 'danger' : 'monarch'} /> : null}
          {monthly > 0 ? (
            <SystemPanel title={t(BUDGET_CONSTANTS.PLAN_TITLE)} variant="system">
              <BudgetStyles.Summary $danger={false}>
                {t(BUDGET_CONSTANTS.PLAN_DAILY, { amount: formatAmount(dailySafe) })}
              </BudgetStyles.Summary>
              <BudgetStyles.Summary $danger={projected > monthly}>
                {t(BUDGET_CONSTANTS.PLAN_PROJECTED, { amount: formatAmount(projected) })}
              </BudgetStyles.Summary>
            </SystemPanel>
          ) : null}
          {monthExpenses.length > 0 ? (
            <BudgetStyles.Block>
              <PrimaryButton label={t(BUDGET_CONSTANTS.RESET_MONTH)} onPress={handleResetMonth} variant="danger" compact />
            </BudgetStyles.Block>
          ) : null}
        </SystemPanel>
        <SystemPanel title={t(BUDGET_CONSTANTS.ADD)}>
          <DateNavigator
            label={formatDayLabel(day)}
            onPrevious={() => setDay(addDays(day, -1))}
            onNext={() => setDay(addDays(day, 1))}
            nextDisabled={day >= todayKey()}
            previousLabel={t(COMMON_CONSTANTS.ACTIONS.PREVIOUS)}
            nextLabel={t(COMMON_CONSTANTS.ACTIONS.NEXT)}
          />
          <InputField
            label={t(BUDGET_CONSTANTS.AMOUNT)}
            value={amount}
            onChangeText={setAmount}
            placeholder={t(BUDGET_CONSTANTS.AMOUNT_PLACEHOLDER)}
            keyboardType="decimal-pad"
            error={error === BUDGET_CONSTANTS.VALIDATION.AMOUNT ? t(error) : undefined}
          />
          <InputField
            label={t(BUDGET_CONSTANTS.NOTE)}
            value={note}
            onChangeText={setNote}
            placeholder={t(BUDGET_CONSTANTS.NOTE_PLACEHOLDER)}
            maxLength={BUDGET_RULES.NOTE_MAX}
          />
          <BudgetStyles.Block>
            <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.ADD)} onPress={handleAddExpense} />
          </BudgetStyles.Block>
          {dayExpenses.length === 0 ? <BudgetStyles.Empty>{t(BUDGET_CONSTANTS.EMPTY)}</BudgetStyles.Empty> : null}
          {dayExpenses.map((expense: Expense) =>
            editingId === expense?.id ? (
              <BudgetStyles.Block key={expense?.id}>
                <InputField
                  label={t(BUDGET_CONSTANTS.AMOUNT)}
                  value={editAmount}
                  onChangeText={setEditAmount}
                  placeholder={t(BUDGET_CONSTANTS.AMOUNT_PLACEHOLDER)}
                  keyboardType="decimal-pad"
                  error={editError === BUDGET_CONSTANTS.VALIDATION.AMOUNT ? t(editError) : undefined}
                />
                <InputField
                  label={t(BUDGET_CONSTANTS.NOTE)}
                  value={editNote}
                  onChangeText={setEditNote}
                  placeholder={t(BUDGET_CONSTANTS.NOTE_PLACEHOLDER)}
                  maxLength={BUDGET_RULES.NOTE_MAX}
                />
                <BudgetStyles.Actions>
                  <PrimaryButton label={t(COMMON_CONSTANTS.ACTIONS.CANCEL)} onPress={handleCancelEdit} variant="ghost" compact />
                  <PrimaryButton
                    label={t(COMMON_CONSTANTS.ACTIONS.SAVE)}
                    onPress={() => handleSaveEdit(expense)}
                    compact
                  />
                </BudgetStyles.Actions>
              </BudgetStyles.Block>
            ) : (
              <BudgetStyles.ExpenseBlock key={expense?.id}>
                <BudgetStyles.Row>
                  <BudgetStyles.Note numberOfLines={2}>
                    {expense?.note ? expense.note : t(BUDGET_CONSTANTS.AMOUNT)}
                  </BudgetStyles.Note>
                  <BudgetStyles.Amount>{formatAmount(expense?.amount ?? 0)}</BudgetStyles.Amount>
                </BudgetStyles.Row>
                <BudgetStyles.Actions>
                  <PrimaryButton label={t(BUDGET_CONSTANTS.EDIT)} onPress={() => handleStartEdit(expense)} variant="ghost" compact />
                  <PrimaryButton
                    label={t(COMMON_CONSTANTS.ACTIONS.DELETE)}
                    onPress={() => dispatch(removeExpense(expense?.id))}
                    variant="ghost"
                    compact
                  />
                </BudgetStyles.Actions>
              </BudgetStyles.ExpenseBlock>
            ),
          )}
        </SystemPanel>
        <SystemPanel title={t(BUDGET_CONSTANTS.NIGHT)} variant="danger">
          <ToggleRow
            label={t(BUDGET_CONSTANTS.NIGHT)}
            hint={t(BUDGET_CONSTANTS.NIGHT_HINT)}
            value={!!budget?.nightReminderEnabled}
            onValueChange={enabled => handleNight(budget?.nightHour ?? BUDGET_RULES.NIGHT_HOUR, budget?.nightMinute ?? 0, enabled)}
          />
          <Stepper
            label={t(BUDGET_CONSTANTS.HOUR)}
            valueLabel={formatClock(budget?.nightHour ?? BUDGET_RULES.NIGHT_HOUR, budget?.nightMinute ?? 0)}
            value={budget?.nightHour ?? BUDGET_RULES.NIGHT_HOUR}
            min={0}
            max={BUDGET_RULES.HOUR_MAX}
            step={1}
            onChange={hour => handleNight(hour, budget?.nightMinute ?? 0, !!budget?.nightReminderEnabled)}
          />
          <Stepper
            label={t(BUDGET_CONSTANTS.MINUTE)}
            valueLabel={formatClock(budget?.nightHour ?? BUDGET_RULES.NIGHT_HOUR, budget?.nightMinute ?? 0)}
            value={budget?.nightMinute ?? 0}
            min={0}
            max={BUDGET_RULES.MINUTE_MAX}
            step={BUDGET_RULES.MINUTE_STEP}
            onChange={minute => handleNight(budget?.nightHour ?? BUDGET_RULES.NIGHT_HOUR, minute, !!budget?.nightReminderEnabled)}
          />
          <BudgetStyles.Status>
            <BudgetStyles.Empty>
              {loggedToday ? t(BUDGET_CONSTANTS.LOGGED) : t(BUDGET_CONSTANTS.MISSING)}
            </BudgetStyles.Empty>
          </BudgetStyles.Status>
        </SystemPanel>
      </PageContainer>
    </KeybordView>
  );
};

export default Budget;
