import atLeastOneDigit from './atLeastOneDigit'
import atLeastOneLowerCase from './atLeastOneLowerCase'
import atLeastOneSpecial from './atLeastOneSpecial'
import atLeastOneUpperCase from './atLeastOneUpperCase'
import minLength from './minLength'
import errors from './constants'

export default function password(errorText?: string) {
  return (password?: unknown) => {
    const validations = {
      isInvalidLength: minLength(8)(password),
      isInvalidDigit: atLeastOneDigit(password),
      isInvalidUpperCase: atLeastOneUpperCase(password),
      isInvalidLowerCase: atLeastOneLowerCase(password),
      isInvalidSpecial: atLeastOneSpecial(password),
    }
    const isAllValid =
      [
        validations.isInvalidDigit,
        validations.isInvalidUpperCase,
        validations.isInvalidLowerCase,
        validations.isInvalidSpecial,
      ].filter((i) => !i).length >= 3
    return !validations.isInvalidLength && isAllValid ? undefined : errorText || errors.password
  }
}
