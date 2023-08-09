import getCookie from '../getCookie'

describe('getCookie utils', () => {
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: 'jwt=test; new=new_test',
  })

  it('getCookie should return correct value', () => {
    const jwtString = getCookie('jwt')
    const newString = getCookie('new')

    expect(jwtString).toBe('test')
    expect(newString).toBe('new_test')
  })

  it('getCookie should return empty string', () => {
    const jwt = getCookie('test')
    expect(jwt).toBe('')
  })
})
