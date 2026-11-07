import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import PageContainer from '../../components/PageContainer';
import ScreenHeader from '../../components/ScreenHeader';
import SpendCalculator from '../../components/SpendCalculator';
import PrimaryButton from '../../components/PrimaryButton';
import { CalculatorStyles } from './styles';
import type { CalculatorEntry } from '../../types';
import { CALCULATOR_CONSTANTS } from '../../constants/calculator';
import { COMMON_CONSTANTS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../store';
import { addCalculatorEntry, removeCalculatorEntry } from '../../store/slices/calculatorSlice';
import { formatAmount } from '../../utils/money';
import { formatDateTime } from '../../utils/date';
import { generateId } from '../../utils/helpers';

const Calculator = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const entries = useAppSelector(state => state?.calculator?.entries) ?? [];
  const [label, setLabel] = useState('');
  const [labelError, setLabelError] = useState('');

  const handleSave = (payload: { expression: string; result: number }) => {
    if (!label.trim()) {
      setLabelError(t(CALCULATOR_CONSTANTS.LABEL_REQUIRED));
      return;
    }
    const entry: CalculatorEntry = {
      id: generateId(),
      label: label.trim(),
      expression: payload.expression,
      result: payload.result,
      createdAt: Date.now(),
    };
    dispatch(addCalculatorEntry(entry));
    setLabel('');
    setLabelError('');
  };

  const handleLabel = (value: string) => {
    setLabel(value);
    setLabelError('');
  };

  const handleDelete = (entry: CalculatorEntry) => {
    Alert.alert(t(CALCULATOR_CONSTANTS.DELETE_TITLE), t(CALCULATOR_CONSTANTS.DELETE_BODY), [
      { text: t(COMMON_CONSTANTS.ACTIONS.CANCEL), style: 'cancel' },
      {
        text: t(COMMON_CONSTANTS.ACTIONS.DELETE),
        style: 'destructive',
        onPress: () => dispatch(removeCalculatorEntry(entry.id)),
      },
    ]);
  };

  return (
    <PageContainer>
      <ScreenHeader title={t(CALCULATOR_CONSTANTS.TITLE)} subtitle={t(CALCULATOR_CONSTANTS.SUBTITLE)} />
      <SpendCalculator label={label} onLabelChange={handleLabel} labelError={labelError} onSave={handleSave} />
      <CalculatorStyles.HistoryTitle>{t(CALCULATOR_CONSTANTS.HISTORY)}</CalculatorStyles.HistoryTitle>
      {entries.length === 0 ? <CalculatorStyles.Empty>{t(CALCULATOR_CONSTANTS.HISTORY_EMPTY)}</CalculatorStyles.Empty> : null}
      {entries.map((entry: CalculatorEntry) => (
        <CalculatorStyles.Row key={entry?.id}>
          <CalculatorStyles.Label>{entry?.label}</CalculatorStyles.Label>
          <CalculatorStyles.Meta>
            {entry?.expression} · {formatDateTime(entry?.createdAt)}
          </CalculatorStyles.Meta>
          <CalculatorStyles.Result>{formatAmount(entry?.result ?? 0)}</CalculatorStyles.Result>
          <CalculatorStyles.Actions>
            <PrimaryButton
              label={t(COMMON_CONSTANTS.ACTIONS.DELETE)}
              onPress={() => handleDelete(entry)}
              variant="ghost"
              compact
            />
          </CalculatorStyles.Actions>
        </CalculatorStyles.Row>
      ))}
    </PageContainer>
  );
};

export default Calculator;
