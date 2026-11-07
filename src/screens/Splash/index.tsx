import React, { useMemo } from 'react';
import { Dimensions, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SplashStyles } from './styles';
import { LOADER_GIF } from '../../constants/images';
import { COMMON_CONSTANTS } from '../../constants/common';
import { SPLASH_CONSTANTS } from '../../constants/screens';

const Splash = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const gifStyle = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    return { position: 'absolute' as const, top: 0, left: 0, width, height };
  }, []);

  return (
    <SplashStyles.Container>
      <Image source={LOADER_GIF} style={gifStyle} resizeMode="cover" />
      <SplashStyles.Shade />
      <SplashStyles.Footer $bottom={insets.bottom}>
        <SplashStyles.Title>{t(COMMON_CONSTANTS.APP_NAME).toUpperCase()}</SplashStyles.Title>
        <SplashStyles.Tagline>{t(SPLASH_CONSTANTS.TAGLINE)}</SplashStyles.Tagline>
        <SplashStyles.Loading>{t(SPLASH_CONSTANTS.LOADING)}</SplashStyles.Loading>
      </SplashStyles.Footer>
    </SplashStyles.Container>
  );
};

export default Splash;
