import { renderHook } from '@testing-library/react-hooks'

import usePrevious from '../usePrevious'

describe('usePrevious hook', () => {
  const initialState = 0
  const setUp = () =>
    renderHook(({ state }) => usePrevious(state), {
      initialProps: { state: initialState },
    })

  it('should return undefined on initial render', () => {
    const { result } = setUp()

    expect(result.current).toBeUndefined()
  })

  it('should always return previous state after each update', () => {
    const { result, rerender } = setUp()

    rerender({ state: 2 })
    expect(result.current).toBe(initialState)

    rerender({ state: 4 })
    expect(result.current).toBe(2)

    rerender({ state: 6 })
    expect(result.current).toBe(4)
  })
})
