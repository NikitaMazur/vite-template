import errors from '../constants'
import phone from '../phone'

describe('phone validation', () => {
  test.each([
    ['+1 (123) 456-7890', undefined],
    ['+1 123 456 7890', undefined],
    ['123-456-7890', undefined],
    ['(123) 456-7890', undefined],
    ['123.456.7890', undefined],
    ['1234567890', errors.phone],
    ['+2 (123) 456-7890', errors.phone],
    ['123 456 78', errors.phone],
    ['(12) 345-6789', errors.phone],
    ['123.45a.7890', errors.phone],
  ])('phone(%s) should return %s', (phoneNumber, expectedResult) => {
    expect(phone(phoneNumber)).toBe(expectedResult)
  })
})
