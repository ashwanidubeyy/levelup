import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useAppSelector } from '../../store';
import { resolveAppTheme } from '../../theme/colorScheme';
import { applyFontChoice } from '../../theme/themeFonts';
import type { ColorSchemeId, FontId, ThemeId } from '../../theme/types';

interface Props {
  children: React.ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
  const themeId = useAppSelector(state => state?.settings?.themeId) as ThemeId | undefined;
  const colorScheme = (useAppSelector(state => state?.settings?.colorScheme) ?? 'dark') as ColorSchemeId;
  const overrides = useAppSelector(state => state?.settings?.themeOverrides);
  const fontId = (useAppSelector(state => state?.settings?.fontId) ?? 'minimal') as FontId;
  const theme = useMemo(
    () => applyFontChoice(resolveAppTheme(themeId, colorScheme, overrides), fontId),
    [colorScheme, fontId, overrides, themeId],
  );

  return (
    <ThemeProvider theme={theme} key={`${theme.id}-${colorScheme}-${fontId}`}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
