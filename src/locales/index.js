import {useTranslation, initReactI18next} from 'react-i18next';
import i18next from 'i18next';
import enTranslations from './en.json';
import ptBrTranslations from './pt-br.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ptBr',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: enTranslations,
    },
    ptBr: {
      translation: ptBrTranslations,
    },
  },
});
