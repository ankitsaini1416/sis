import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import errorEN from './helpers/locales/en/error.json'
import fieldsEN from './helpers/locales/en/fields.json'
import messageEN from './helpers/locales/en/message.json'
import referenceEN from './helpers/locales/en/reference.json'
import translationEN from './helpers/locales/en/translation.json'
import messageFR from './helpers/locales/fr/message.json'
import translationFR from './helpers/locales/fr/translation.json'

// not like to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
  en: {
    translation: translationEN,
    message: messageEN,
    error: errorEN,
    fields: fieldsEN,
    reference: referenceEN,
  },
  de: {
    translation: translationFR,
    message: messageFR,
  },
}

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: localStorage.getItem('lang'),
    fallbackLng: localStorage.getItem('lang'),
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })
export default i18n
