import React from 'react';
import { useTheme } from 'styled-components/native';
import type { InfoRowProps } from '../../types';
import { InfoRowStyles } from './styles';
import { accentFor } from '../../utils/variant';
import type { AppTheme } from '../../theme/types';

const InfoRow = ({ label, value, emphasis }: InfoRowProps) => {
  const theme = useTheme() as AppTheme;
  return (
    <InfoRowStyles.Container>
      <InfoRowStyles.Label>{label}</InfoRowStyles.Label>
      <InfoRowStyles.Value $color={emphasis ? accentFor(emphasis, theme) : theme.colors.TEXT}>{value}</InfoRowStyles.Value>
    </InfoRowStyles.Container>
  );
};

export default InfoRow;
