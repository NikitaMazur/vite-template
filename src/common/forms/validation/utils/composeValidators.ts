type Validator<T> = (value?: unknown) => T | Promise<T>

export default function composeValidators<T>(...validators: Validator<T>[]) {
  return (value?: unknown): T | undefined => {
    let result
    validators.some((validator) => {
      result = validator(value)
      return result !== undefined
    })
    return result
  }
}
