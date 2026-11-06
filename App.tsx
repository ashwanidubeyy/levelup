import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Splash from './src/screens/Splash';
import { useAppInit } from './src/hooks/useAppInit';
import { COLORS } from './src/theme/colors';

const Root = () => {
  const { ready, onboardingComplete } = useAppInit();

  return ready ? <AppNavigator initialRoute={onboardingComplete ? 'MainTabs' : 'Onboarding'} /> : <Splash />;
};

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.TRANSPARENT} translucent />
      <Root />
    </SafeAreaProvider>
  </Provider>
);

export default App;
