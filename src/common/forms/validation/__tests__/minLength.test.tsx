import { render } from '@testing-library/react'

import minLength from '../minLength'

vi.mock('common/language')

describe('minLength validation', () => {
  test.each([
    [5, '12345', undefined, undefined],
    [1, 12345, undefined, undefined],
    [1, { test: 'A' }, undefined, undefined],
    [5, '1234', 'Wrong text length!', 'Wrong text length!'],
  ])(
    'should return correct value for min length %p and value %p',
    (count, value, errorText, result) => {
      expect(minLength(count, errorText)(value)).toEqual(result)
    },
  )

  test.each([
    [5, '123', undefined, 'The minimum length is 5'],
    [1, undefined, undefined, 'The minimum length is 1'],
    [1, null, undefined, 'The minimum length is 1'],
    [1, '', undefined, 'The minimum length is 1'],
  ])('should return error for min length %p and value %p', (count, value, errorText, result) => {
    const { getByText } = render(<>{minLength(count, errorText)(value)}</>)

    expect(getByText(result).innerHTML).toBe(result)
  })
})
