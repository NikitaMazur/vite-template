import isNumber from 'lodash/isNumber'

import { useTranslations, interpolate } from 'common/language'

type Props = {
  minLength: number
}

const ErrorText = ({ minLength }: Props) => {
  const { gettext } = useTranslations()

  return <>{interpolate(gettext('The minimum length is %s'), [minLength])}</>
}

export default function minLength(minLength: number, errorText?: string) {
  const message = errorText || <ErrorText minLength={minLength} />
  return function (text?: unknown) {
    if (!isNumber(minLength)) {
      return
    }

    return !text || (typeof text === 'string' && text.length < minLength) ? message : undefined
  }
}
