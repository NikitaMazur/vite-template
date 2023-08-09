import classnames from '../classnames'

describe('classnames utils', () => {
  test.each([
    [['class1'], 'class1'],
    [['class1', 'class2'], 'class1 class2'],
    [['class1', true && 'class2'], 'class1 class2'],
    [['class1', false && 'class2'], 'class1'],
  ])('should return correct value', (classes, result) => {
    expect(classnames(...classes)).toEqual(result)
  })
})
