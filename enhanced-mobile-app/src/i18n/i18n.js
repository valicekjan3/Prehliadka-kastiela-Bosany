import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import language resources
import en from './translations/en.json';
import sk from './translations/sk.json';
import cs from './translations/cs.json';
import de from './translations/de.json';
import ja from './translations/ja.json';
import zh from './translations/zh.json';
import hi from './translations/hi.json';
import tr from './translations/tr.json';
import ru from './translations/ru.json';
import fr from './translations/fr.json';
import es from './translations/es.json';
import it from './translations/it.json';
import nl from './translations/nl.json';
import pt from './translations/pt.json';
import ar from './translations/ar.json';
import ko from './translations/ko.json';
import hu from './translations/hu.json';
import el from './translations/el.json';
import no from './translations/no.json';
import fi from './translations/fi.json';
import da from './translations/da.json';
import sv from './translations/sv.json';

// Define all supported languages
export const supportedLanguages = [
  { code: 'sk', name: 'Slovenčina', flag: 'sk', rtl: false },
  { code: 'cs', name: 'Čeština', flag: 'cz', rtl: false },
  { code: 'en', name: 'English', flag: 'gb', rtl: false },
  { code: 'de', name: 'Deutsch', flag: 'de', rtl: false },
  { code: 'ja', name: '日本語', flag: 'jp', rtl: false },
  { code: 'zh', name: '中文', flag: 'cn', rtl: false },
  { code: 'hi', name: 'हिन्दी', flag: 'in', rtl: false },
  { code: 'tr', name: 'Türkçe', flag: 'tr', rtl: false },
  { code: 'ru', name: 'Русский', flag: 'ru', rtl: false },
  { code: 'fr', name: 'Français', flag: 'fr', rtl: false },
  { code: 'es', name: 'Español', flag: 'es', rtl: false },
  { code: 'it', name: 'Italiano', flag: 'it', rtl: false },
  { code: 'nl', name: 'Nederlands', flag: 'nl', rtl: false },
  { code: 'pt', name: 'Português', flag: 'pt', rtl: false },
  { code: 'ar', name: 'العربية', flag: 'sa', rtl: true },
  { code: 'ko', name: '한국어', flag: 'kr', rtl: false },
  { code: 'hu', name: 'Magyar', flag: 'hu', rtl: false },
  { code: 'el', name: 'Ελληνικά', flag: 'gr', rtl: false },
  { code: 'no', name: 'Norsk', flag: 'no', rtl: false },
  { code: 'fi', name: 'Suomi', flag: 'fi', rtl: false },
  { code: 'da', name: 'Dansk', flag: 'dk', rtl: false },
  { code: 'sv', name: 'Svenska', flag: 'se', rtl: false }
];

// Resources object with all translations
const resources = {
  en: { translation: en },
  sk: { translation: sk },
  cs: { translation: cs },
  de: { translation: de },
  ja: { translation: ja },
  zh: { translation: zh },
  hi: { translation: hi },
  tr: { translation: tr },
  ru: { translation: ru },
  fr: { translation: fr },
  es: { translation: es },
  it: { translation: it },
  nl: { translation: nl },
  pt: { translation: pt },
  ar: { translation: ar },
  ko: { translation: ko },
  hu: { translation: hu },
  el: { translation: el },
  no: { translation: no },
  fi: { translation: fi },
  da: { translation: da },
  sv: { translation: sv }
};

// Get the device language
const getDeviceLanguage = () => {
  const deviceLang = Localization.locale.split('-')[0];
  // Check if device language is supported, otherwise default to English
  return supportedLanguages.some(lang => lang.code === deviceLang) ? deviceLang : 'en';
};

// Get stored language from AsyncStorage
const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem('userLanguage');
    return storedLang || getDeviceLanguage();
  } catch (error) {
    console.error('Error retrieving stored language:', error);
    return getDeviceLanguage();
  }
};

// Initialize i18n
const initI18n = async () => {
  const language = await getStoredLanguage();
  
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });
  
  return i18n;
};

// Function to change language
export const changeLanguage = async (languageCode) => {
  try {
    await AsyncStorage.setItem('userLanguage', languageCode);
    await i18n.changeLanguage(languageCode);
    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

// Function to get current language info
export const getCurrentLanguageInfo = () => {
  const currentLangCode = i18n.language;
  return supportedLanguages.find(lang => lang.code === currentLangCode) || supportedLanguages[2]; // Default to English
};

// Function to check if current language is RTL
export const isRTL = () => {
  const currentLang = getCurrentLanguageInfo();
  return currentLang.rtl;
};

export default initI18n;