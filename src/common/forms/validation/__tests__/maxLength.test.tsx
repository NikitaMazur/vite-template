import { render } from '@testing-library/react'

import maxLength from '../maxLength'

vi.mock('common/language')

describe('maxLength validation', () => {
  test.each([
    [maxLength(5)('12345'), undefined],
    [maxLength(1)(12345), undefined],
    [maxLength(1)({ test: 'A' }), undefined],
    [maxLength(1)(undefined), undefined],
    [maxLength(1)(null), undefined],
    [maxLength(5, 'Wrong text length!')('123456'), 'Wrong text length!'],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })

  it('maxLength validation should return default error text', () => {
    const { getByText } = render(<>{maxLength(5)('123456')}</>)

    expect(getByText('The maximum length is 5').innerHTML).toBe('The maximum length is 5')
  })
})
