import composeValidators from '../composeValidators'
import { required } from '../../required'
import maxLength from '../../maxLength'
import email from '../../email'
import constants from '../../constants'

describe('composeValidators function', () => {
  const text = 'test'
  test.each([
    [
      composeValidators(
        (value) => required(value),
        (value) => maxLength(4)(value),
        (value) => email(value),
      )(text),
      constants.email,
    ],
    [
      composeValidators(
        (value) => required(value),
        (value) => maxLength(3, 'maxLength')(value),
        (value) => email(value),
      )(text),
      'maxLength',
    ],
    [
      composeValidators(
        (value: unknown) => required(value),
        (value) => maxLength(3, 'maxLength')(value),
        (value) => email(value),
      )(null),
      constants.required,
    ],
    [composeValidators((value) => required(value))(null), constants.required],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})
