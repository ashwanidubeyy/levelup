import React from 'react';
import type { AppShortcutProps } from '../../types';
import { AppShortcutStyles } from './styles';

const AppShortcut = ({ label, onPress }: AppShortcutProps) => (
  <AppShortcutStyles.Button onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
    <AppShortcutStyles.Label numberOfLines={1}>{label}</AppShortcutStyles.Label>
  </AppShortcutStyles.Button>
);

export default AppShortcut;
