import React from 'react';
import type { InfoRowProps } from '../../types';
import { InfoRowStyles } from './styles';
import { COLORS } from '../../theme/colors';
import { accentFor } from '../../utils/variant';

const InfoRow = ({ label, value, emphasis }: InfoRowProps) => (
  <InfoRowStyles.Container>
    <InfoRowStyles.Label>{label}</InfoRowStyles.Label>
    <InfoRowStyles.Value $color={emphasis ? accentFor(emphasis) : COLORS.TEXT}>{value}</InfoRowStyles.Value>
  </InfoRowStyles.Container>
);

export default InfoRow;
