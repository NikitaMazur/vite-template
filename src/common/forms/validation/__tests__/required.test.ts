import { required, requiredNumber, requiredArrayOfStrings } from '../required'
import constants from '../constants'

describe('required validation', () => {
  test.each([
    [required()('test'), undefined],
    [required()(null), constants.required],
    [required()(undefined), constants.required],
    [required()(''), constants.required],
    [required()(0), constants.required],
    [required('Custom')(null), 'Custom'],
    [required('Custom')(undefined), 'Custom'],
    [required('Custom')(''), 'Custom'],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})

describe('requiredNumber validation', () => {
  test.each([
    [requiredNumber()(111), undefined],
    [requiredNumber()(0), undefined],
    [requiredNumber()(null), constants.required],
    [requiredNumber()(undefined), constants.required],
    [requiredNumber()(''), constants.required],
    [requiredNumber('Custom')(null), 'Custom'],
    [requiredNumber('Custom')(undefined), 'Custom'],
    [requiredNumber('Custom')(''), 'Custom'],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})

describe('requiredArrayOfStrings validation', () => {
  test.each([
    [requiredArrayOfStrings(['test']), undefined],
    [requiredArrayOfStrings(['test', '\n']), undefined],
    [requiredArrayOfStrings(['']), constants.required],
    [requiredArrayOfStrings(['\n']), constants.required],
    [requiredArrayOfStrings(''), constants.required],
    [requiredArrayOfStrings(null), constants.required],
    [requiredArrayOfStrings(undefined), constants.required],
    [requiredArrayOfStrings(123), constants.required],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})
