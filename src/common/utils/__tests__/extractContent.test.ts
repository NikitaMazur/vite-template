import extractContent from '../extractContent'

describe('extractContent utils', () => {
  test.each([
    ['<h1>Hello World!</h1>', 'Hello World!'],
    ['<ul><li>first</li><li>second</li></ul>', 'firstsecond'],
    ['<div><h1>Nested text</h1></div>', 'Nested text'],
  ])('should return correct value for %p', (content, result) => {
    expect(extractContent(content)).toEqual(result)
  })
})
