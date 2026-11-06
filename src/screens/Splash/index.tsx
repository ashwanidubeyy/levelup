import React from 'react';
import { useTranslation } from 'react-i18next';
import { SplashStyles } from './styles';
import { LOADER_GIF } from '../../constants/images';
import { COMMON_CONSTANTS } from '../../constants/common';
import { SPLASH_CONSTANTS } from '../../constants/screens';

const Splash = () => {
  const { t } = useTranslation();

  return (
    <SplashStyles.Container>
      <SplashStyles.Gif source={LOADER_GIF} resizeMode="contain" />
      <SplashStyles.Title>{t(COMMON_CONSTANTS.APP_NAME).toUpperCase()}</SplashStyles.Title>
      <SplashStyles.Tagline>{t(SPLASH_CONSTANTS.TAGLINE)}</SplashStyles.Tagline>
    </SplashStyles.Container>
  );
};

export default Splash;
