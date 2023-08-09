import isNumber from 'lodash/isNumber'

import { useTranslations, interpolate } from 'common/language'

type Props = {
  maxLength: number
}

export const ErrorLengthText = ({ maxLength }: Props) => {
  const { gettext } = useTranslations()

  return <>{interpolate(gettext('The maximum length is %s'), [maxLength])}</>
}

export default function maxLength(maxLength: number, errorText?: string) {
  const message = errorText || <ErrorLengthText maxLength={maxLength} />
  return function (text?: unknown) {
    if (!text || typeof text !== 'string' || !isNumber(maxLength)) {
      return
    }

    return text.length <= maxLength ? undefined : message
  }
}
