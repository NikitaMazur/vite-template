type Executor = {
  resolve: (value: unknown | PromiseLike<unknown>) => void
  reject: (reason?: unknown) => void
}

export default function debouncedPromise<T, U extends unknown[]>(
  fn: (...args: U) => Promise<T>,
  ms = 0,
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const pending: Executor[] = []
  return (...args: U) => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const currentPending = [...pending]
        pending.length = 0
        Promise.resolve(fn(...args)).then(
          (data) => {
            currentPending.forEach(({ resolve }) => resolve(data))
          },
          (error) => {
            currentPending.forEach(({ reject }) => reject(error))
          },
        )
      }, ms)
      pending.push({ resolve, reject })
    })
  }
}
