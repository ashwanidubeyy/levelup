import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';
import { I18N_CONFIG } from '../constants/common';

i18n.use(initReactI18next).init({
  resources: {
    [I18N_CONFIG.DEFAULT_LANGUAGE]: { translation: en },
  },
  lng: I18N_CONFIG.DEFAULT_LANGUAGE,
  fallbackLng: I18N_CONFIG.DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
