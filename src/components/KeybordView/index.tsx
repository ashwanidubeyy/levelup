import React from 'react';
import type { KeybordViewProps } from '../../types';
import { KeybordViewStyles } from './styles';

const KeybordView = ({ children }: KeybordViewProps) => (
  <KeybordViewStyles.Container behavior="padding">{children}</KeybordViewStyles.Container>
);

export default KeybordView;
