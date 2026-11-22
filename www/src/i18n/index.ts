import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

export const DEFAULT_LANGUAGE: LanguageCode = 'en'
export const LANGUAGE_STORAGE_KEY = 'cvbot.language'

// Lets a shared link pick the language, e.g. https://estebanmpa.dev/services?lang=es
export const LANGUAGE_QUERY_PARAM = 'lang'

function syncDocumentLanguage(lng: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng.split('-')[0]
  }
}

i18n.on('languageChanged', syncDocumentLanguage)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.code),
    load: 'languageOnly',
    interpolation: {
      // React already escapes rendered values
      escapeValue: false,
    },
    detection: {
      // A language in the link wins, and is remembered for later visits
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: LANGUAGE_QUERY_PARAM,
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n
