import { ComponentType, useContext } from 'react'

import { LanguageContext } from './LanguageManager'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withTranslations(ChildComponent: ComponentType<any>) {
  return function (props: object) {
    return (
      <LanguageContext.Consumer>
        {/* eslint-disable-next-line */}
        {({ translations, ...rest }) => <ChildComponent {...props} {...rest} />}
      </LanguageContext.Consumer>
    )
  }
}

export function useTranslations() {
  // eslint-disable-next-line
  const { translations, ...translationData } = useContext(LanguageContext)
  return translationData
}

export function gettext(text = '') {
  return <LanguageContext.Consumer>{({ gettext }) => gettext(text)}</LanguageContext.Consumer>
}

export function pgettext(id = '', text = '') {
  return <LanguageContext.Consumer>{({ pgettext }) => pgettext(id, text)}</LanguageContext.Consumer>
}

export function ngettext(singular = '', plural = '', count: number) {
  return (
    <LanguageContext.Consumer>
      {({ ngettext }) => ngettext(singular, plural, count)}
    </LanguageContext.Consumer>
  )
}

export function npgettext(id = '', singular = '', plural = '', count: number) {
  return (
    <LanguageContext.Consumer>
      {({ npgettext }) => npgettext(id, singular, plural, count)}
    </LanguageContext.Consumer>
  )
}

export function interpolate(
  message: string,
  obj: Record<string, string | number> | (string | number)[],
) {
  if (Array.isArray(obj)) {
    return message.replace(/%s/g, () => String(obj.shift()))
  }

  return message.replace(/%\(\w+\)s/g, (match) => String(obj[match.slice(2, -2)]))
}
