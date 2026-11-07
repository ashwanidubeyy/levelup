import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useAppSelector } from '../../store';
import { resolveAppTheme } from '../../theme/colorScheme';
import type { ColorSchemeId, ThemeId } from '../../theme/types';

interface Props {
  children: React.ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
  const themeId = useAppSelector(state => state?.settings?.themeId) as ThemeId | undefined;
  const colorScheme = (useAppSelector(state => state?.settings?.colorScheme) ?? 'dark') as ColorSchemeId;
  const theme = useMemo(() => resolveAppTheme(themeId, colorScheme), [themeId, colorScheme]);

  return (
    <ThemeProvider theme={theme} key={`${theme.id}-${colorScheme}`}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
