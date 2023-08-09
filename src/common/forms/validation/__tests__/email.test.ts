import email from '../email'
import constants from '../constants'

describe('Email validation', () => {
  test.each([
    ['test@mail.com', undefined],
    ['test.test@mail.com', undefined],
    ['test-test@mail.com', undefined],
    ['test', constants.email],
    ['test.test', constants.email],
    ['test@mail', constants.email],
    ['@mail.com', constants.email],
  ])('should return correct value', (value, result) => {
    expect(email(value)).toEqual(result)
  })
})
