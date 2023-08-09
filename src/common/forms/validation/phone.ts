import errors from './constants'

export default function phone(value?: unknown) {
  if (!value) {
    return
  }
  const phoneNumberPattern = /^(\+1)?\s*\(?(\d{3})\)?[-.\s]+(\d{3})[-.\s]+(\d{4})$/
  return typeof value === 'string' && phoneNumberPattern.test(value) ? undefined : errors.phone
}
