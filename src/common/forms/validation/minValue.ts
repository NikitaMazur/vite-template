import isNumber from 'lodash/isNumber'

import { interpolate } from 'common/language'

import errors from './constants'

export default function minValue(min = 0) {
  return (value?: unknown) =>
    isNumber(value) && value < min ? interpolate(errors.minValue, [min]) : undefined
}
