import isEmpty from 'lodash/isEmpty'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'

import errors from './constants'

export function required(value?: unknown, message = errors.required) {
  return !value || (isEmpty(value) && !isBoolean(value)) ? message : undefined
}

export function requiredNumber(message = errors.required) {
  return function (value?: unknown) {
    return !isNumber(value) ? message : undefined
  }
}

export function requiredArrayOfStrings(value?: unknown) {
  return !Array.isArray(value) ||
    isEmpty(
      value.map((val) => (val?.replace ? val.replace(/(\r\n|\n|\r)/gm, '') : val)).filter(Boolean),
    )
    ? errors.required
    : undefined
}
