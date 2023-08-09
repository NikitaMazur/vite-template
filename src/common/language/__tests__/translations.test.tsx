import { render } from '@testing-library/react'

import { useTranslations, interpolate } from '../index'
import LanguageManager from '../LanguageManager'

const data = {
  catalog: {
    'Good morning': 'Gutten tag',
    'Hello neighbor': ['Hallo Nachbar', 'Hallo Nachbarn'],
    'Submit form Application form': 'Formular absenden',
    'Hello neighbor Neighbors': ['Hallo Nachbar', 'Hallo Nachbarn'],
    'I have %s kid': ['Ich habe %s Kind', 'Ich habe %s Kinder'],
  },
}

const View = () => {
  const { gettext, ngettext, pgettext, npgettext } = useTranslations()
  return (
    <div>
      <p>{gettext('Good morning')}</p>
      <p>{ngettext('Hello neighbor', 'Hello neighbors', 2)}</p>
      <p>{pgettext('Application form', 'Submit form')}</p>
      <p>{npgettext('Neighbors', 'Hello neighbor', 'Hello neighbors', 1)}</p>
      <p>{interpolate(ngettext('I have %s kid', 'I have %s kids', 2), [2])}</p>
    </div>
  )
}

describe('Translations work correctly', () => {
  test.each([
    ['Gutten tag'],
    ['Hallo Nachbarn'],
    ['Formular absenden'],
    ['Hallo Nachbar'],
    ['Ich habe 2 Kinder'],
  ])('should return correct value', (text) => {
    const { getByText } = render(
      <LanguageManager data={data}>
        <View />
      </LanguageManager>,
    )
    expect(getByText(text)).toBeTruthy()
  })
})
