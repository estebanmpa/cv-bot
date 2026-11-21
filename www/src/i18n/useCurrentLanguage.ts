import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, LanguageCode } from '.'

/** Current UI language; components using it re-render when the visitor switches. */
export function useCurrentLanguage(): LanguageCode {
  const { i18n } = useTranslation()
  return (i18n.resolvedLanguage as LanguageCode | undefined) ?? DEFAULT_LANGUAGE
}
