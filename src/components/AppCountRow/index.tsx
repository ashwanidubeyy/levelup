import React from 'react';
import StatBar from '../StatBar';
import type { AppCountRowProps } from '../../types';
import { AppCountRowStyles } from './styles';
import { ratio } from '../../utils/helpers';

const AppCountRow = ({ label, count, max, caption }: AppCountRowProps) => (
  <AppCountRowStyles.Container>
    <AppCountRowStyles.Header>
      <AppCountRowStyles.Label>{label}</AppCountRowStyles.Label>
      <AppCountRowStyles.Count>{count}</AppCountRowStyles.Count>
    </AppCountRowStyles.Header>
    <StatBar progress={ratio(count, max)} thin />
    {caption ? <AppCountRowStyles.Caption>{caption}</AppCountRowStyles.Caption> : null}
  </AppCountRowStyles.Container>
);

export default AppCountRow;
