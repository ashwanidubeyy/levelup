import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import type { AppTheme } from '../../theme/types';

const ThemedStatusBar = () => {
  const theme = useTheme() as AppTheme;
  const light = theme.colorScheme === 'light';
  return (
    <StatusBar
      barStyle={light ? 'dark-content' : 'light-content'}
      backgroundColor={theme.colors.TRANSPARENT}
      translucent
    />
  );
};

export default ThemedStatusBar;
