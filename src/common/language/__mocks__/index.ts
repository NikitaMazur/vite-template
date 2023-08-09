export { interpolate } from '../index'

export function useTranslations() {
  return {
    gettext: (value: string) => value,
    pgettext: (id: string, value: string) => `${value} ${id}`,
    ngettext: (singular: string, plural: string, count: number) => (count > 1 ? plural : singular),
    npgettext: (id: string, singular: string, plural: string, count: number) =>
      count > 1 ? `${plural} ${id}` : `${singular} ${id}`,
  }
}
