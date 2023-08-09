import { interpolate } from 'common/language'

import minValue from '../minValue'
import constants from '../constants'

vi.mock('common/language')

describe('minValue validation', () => {
  test.each([
    [minValue(5)(10), undefined],
    [minValue(5)(5), undefined],
    [minValue()(), undefined],
    [minValue(5)(4), interpolate(constants.minValue, [5])],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})
