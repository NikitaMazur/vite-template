import { renderHook, act } from '@testing-library/react-hooks'

import useLocalStorage from '../useLocalStorage'

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with initial value when no value is in localStorage', () => {
    const key = 'testKey'
    const initialValue = 'initialValue'

    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    const [storedValue] = result.current

    expect(storedValue).toEqual(initialValue)
  })

  it('should initialize with stored value when value exists in localStorage', () => {
    const key = 'testKey'
    const storedValue = 'storedValue'
    localStorage.setItem(key, JSON.stringify(storedValue))

    const { result } = renderHook(() => useLocalStorage(key, 'initialValue'))
    const [value] = result.current

    expect(value).toEqual(storedValue)
  })

  it('should update stored value and localStorage when setValue is called', () => {
    const key = 'testKey'
    const initialValue = 'initialValue'
    const newValue = 'newValue'

    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    const [, setValue] = result.current

    act(() => {
      setValue(newValue)
    })

    const [storedValue] = result.current

    expect(storedValue).toEqual(newValue)
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(newValue)
  })

  it('should handle function input for setValue', () => {
    const key = 'testKey'
    const initialValue = 1
    const increment = (value: number) => value + 1

    const { result } = renderHook(() => useLocalStorage(key, initialValue))
    const [, setValue] = result.current

    act(() => {
      setValue(increment)
    })

    const [storedValue] = result.current

    expect(storedValue).toEqual(initialValue + 1)
    expect(JSON.parse(localStorage.getItem(key) as string)).toEqual(initialValue + 1)
  })
})
