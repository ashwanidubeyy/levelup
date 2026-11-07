import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useAppSelector } from '../../store';
import { themeById } from '../../theme/presets';

interface Props {
  children: React.ReactNode;
}

const AppThemeProvider = ({ children }: Props) => {
  const themeId = useAppSelector(state => state?.settings?.themeId);
  const theme = useMemo(() => themeById(themeId), [themeId]);

  return (
    <ThemeProvider theme={theme} key={theme.id}>
      {children}
    </ThemeProvider>
  );
};

export default AppThemeProvider;
