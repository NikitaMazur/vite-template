import same from '../same'
import constants from '../constants'

describe('same validation', () => {
  test.each([
    [same('one')('one'), undefined],
    [same(123)(123), undefined],
    [same({ a: 1 })({ a: 1 }), undefined],
    [same(['1'])(['1']), undefined],
    [same([{ a: 1 }])([{ a: 1 }]), undefined],
    [same('one')('two'), constants.sameName],
    [same(123)(321), constants.sameName],
    [same({ a: 1 })({ a: 2 }), constants.sameName],
    [same(['1'])(['2']), constants.sameName],
    [same([{ a: 1 }])([{ a: 2 }]), constants.sameName],
  ])('should return correct value', (response, result) => {
    expect(response).toEqual(result)
  })
})
