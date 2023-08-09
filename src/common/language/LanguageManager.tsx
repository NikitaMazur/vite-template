import { createContext, ReactNode } from 'react'
import get from 'lodash/get'

type LanguageContextType = {
  languageCode: string
  translations: Record<string, unknown>
  gettext: (text: string) => string
  pgettext: (id: string, text: string) => string
  ngettext: (singular: string, plural: string, count: number) => string
  npgettext: (id: string, singular: string, plural: string, count: number) => string
}

export const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType)

type Props = {
  data?: Record<string, unknown>
  locale?: string
  translationKey?: string
  children: ReactNode
}

export default function LanguageManager({
  data = {},
  locale = 'en',
  translationKey = 'catalog',
  children,
}: Props) {
  const translations = data
  const gettext = (text = '') => {
    return get(translations, [translationKey, text]) || text
  }
  const pgettext = (id: string, text: string) => {
    const message = `${text} ${id}`
    return gettext(message)
  }
  const ngettext = (singular: string, plural: string, count: number) => {
    const translation = get(translations, [translationKey, singular])
    if (translation === undefined) {
      return count === 1 ? singular : plural
    }
    return count === 1 ? translation[0] : translation[1]
  }
  const npgettext = (id: string, singular: string, plural: string, count: number) => {
    const selector = `${singular} ${id}`
    const translation = get(translations, [translationKey, selector])
    if (translation === undefined) {
      return count === 1 ? singular : plural
    }
    return count === 1 ? translation[0] : translation[1]
  }
  return (
    <LanguageContext.Provider
      value={{
        languageCode: locale,
        translations,
        gettext,
        pgettext,
        ngettext,
        npgettext,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
