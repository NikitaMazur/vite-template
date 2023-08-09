import errors from './constants'

export default function integerOnly(value: unknown) {
  if (typeof value !== 'number' || Number.isInteger(value)) {
    return undefined
  }
  return errors.integerOnly
}
