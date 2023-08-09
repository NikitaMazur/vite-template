import isEqual from 'lodash/isEqual'

import errors from './constants'

export default function same(confirmValue?: unknown, errorText = errors.sameName) {
  return function (value?: unknown) {
    return isEqual(confirmValue, value) ? undefined : errorText
  }
}
