import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputField from '../InputField';
import PrimaryButton from '../PrimaryButton';
import type { SpendCalculatorProps } from '../../types';
import { SpendCalculatorStyles } from './styles';
import { CALCULATOR_CONSTANTS, CALCULATOR_KEYS, CALCULATOR_RULES } from '../../constants/calculator';
import { evaluateExpression } from '../../utils/calculator';
import { formatAmount } from '../../utils/money';

const SpendCalculator = ({ label, onLabelChange, labelError, onSave }: SpendCalculatorProps) => {
  const { t } = useTranslation();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const handleKey = (key: string) => {
    if (key === CALCULATOR_CONSTANTS.KEY_CLEAR) {
      setExpression('');
      setResult(null);
      setError(false);
      return;
    }
    if (key === CALCULATOR_CONSTANTS.KEY_EQUALS) {
      const value = evaluateExpression(expression);
      if (value === null) {
        setError(true);
        setResult(null);
        return;
      }
      setError(false);
      setResult(value);
      setExpression(formatAmount(value));
      return;
    }
    setError(false);
    setResult(null);
    setExpression((prev: string) => {
      const next = `${prev}${key}`;
      return next.length > CALCULATOR_RULES.MAX_LENGTH ? prev : next;
    });
  };

  const handleSave = () => {
    const value = result ?? evaluateExpression(expression);
    if (value === null) {
      setError(true);
      return;
    }
    setError(false);
    onSave({ expression, result: value });
  };

  const display = expression?.length > 0 ? expression : t(CALCULATOR_CONSTANTS.DISPLAY_PLACEHOLDER);

  return (
    <SpendCalculatorStyles.Wrap>
      <SpendCalculatorStyles.Hint>{t(CALCULATOR_CONSTANTS.HINT)}</SpendCalculatorStyles.Hint>
      <SpendCalculatorStyles.Display numberOfLines={2}>{display}</SpendCalculatorStyles.Display>
      {error ? <SpendCalculatorStyles.Error>{t(CALCULATOR_CONSTANTS.INVALID)}</SpendCalculatorStyles.Error> : null}
      <SpendCalculatorStyles.Grid>
        {CALCULATOR_KEYS.map((item: (typeof CALCULATOR_KEYS)[number]) => (
          <SpendCalculatorStyles.Key
            key={item.key}
            $wide={item.wide}
            onPress={() => handleKey(item.key)}
            accessibilityRole="button"
            accessibilityLabel={item.key}
          >
            <SpendCalculatorStyles.KeyLabel>{item.key}</SpendCalculatorStyles.KeyLabel>
          </SpendCalculatorStyles.Key>
        ))}
      </SpendCalculatorStyles.Grid>
      <InputField
        label={t(CALCULATOR_CONSTANTS.LABEL)}
        value={label}
        onChangeText={onLabelChange}
        placeholder={t(CALCULATOR_CONSTANTS.LABEL_PLACEHOLDER)}
        error={labelError}
      />
      <SpendCalculatorStyles.Actions>
        <PrimaryButton label={t(CALCULATOR_CONSTANTS.SAVE)} onPress={handleSave} compact />
      </SpendCalculatorStyles.Actions>
    </SpendCalculatorStyles.Wrap>
  );
};

export default SpendCalculator;
