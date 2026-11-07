import React from 'react';
import { useTheme } from 'styled-components/native';
import type { InputFieldProps } from '../../types';
import { InputFieldStyles } from './styles';
import type { AppTheme } from '../../theme/types';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  maxLength,
  keyboardType = 'default',
}: InputFieldProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <InputFieldStyles.Container>
      <InputFieldStyles.Label>{label?.toUpperCase()}</InputFieldStyles.Label>
      <InputFieldStyles.Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.TEXT_DIM}
        selectionColor={theme.colors.BLUE_LIGHT}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        maxLength={maxLength}
        keyboardType={keyboardType}
        accessibilityLabel={label}
        $multiline={multiline}
        $error={!!error}
      />
      {error ? <InputFieldStyles.Error>{error}</InputFieldStyles.Error> : null}
    </InputFieldStyles.Container>
  );
};

export default InputField;
