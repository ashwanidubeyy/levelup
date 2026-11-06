import React from 'react';
import type { InputFieldProps } from '../../types';
import { InputFieldStyles } from './styles';
import { COLORS } from '../../theme/colors';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  maxLength,
}: InputFieldProps) => (
  <InputFieldStyles.Container>
    <InputFieldStyles.Label>{label?.toUpperCase()}</InputFieldStyles.Label>
    <InputFieldStyles.Input
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.TEXT_DIM}
      selectionColor={COLORS.BLUE_LIGHT}
      multiline={multiline}
      textAlignVertical={multiline ? 'top' : 'center'}
      maxLength={maxLength}
      accessibilityLabel={label}
      $multiline={multiline}
      $error={!!error}
    />
    {error ? <InputFieldStyles.Error>{error}</InputFieldStyles.Error> : null}
  </InputFieldStyles.Container>
);

export default InputField;
