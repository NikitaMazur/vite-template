import { QueryClient } from '@tanstack/react-query'
import isObject from 'lodash/isObject'

import API from 'api'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      queryFn: async ({ queryKey }) => {
        const [_key = '', params = {}] = queryKey
        if (!isObject(params)) {
          throw new Error('params must be an object')
        }

        if (typeof _key !== 'string') {
          throw new Error('key must be a string')
        }

        const data = await API.get(_key, { params })
        return data
      },
    },
  },
})

export default client
