import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Splash from './src/screens/Splash';
import { useAppInit } from './src/hooks/useAppInit';
import AppThemeProvider from './src/components/AppThemeProvider';
import ThemedStatusBar from './src/components/ThemedStatusBar';

const Root = () => {
  const { ready, onboardingComplete } = useAppInit();

  return ready ? (
    <AppThemeProvider>
      <ThemedStatusBar />
      <AppNavigator initialRoute={onboardingComplete ? 'MainTabs' : 'Onboarding'} />
    </AppThemeProvider>
  ) : (
    <AppThemeProvider>
      <ThemedStatusBar />
      <Splash />
    </AppThemeProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  </Provider>
);

export default App;
