import { useEffect, useState } from 'react'
import { QueryKey, useQuery } from '@tanstack/react-query'
import omit from 'lodash/omit'
import isEqual from 'lodash/isEqual'
import queryString from 'query-string'
import { useSearchParams } from 'react-router-dom'

import { PaginationResponse } from 'types'
import API from 'api'
import usePrevious from 'common/hooks/usePrevious'

type DefaultFiltersType = {
  offset?: number
  limit?: number
  ordering?: string
}

function useFilters<QueryType extends DefaultFiltersType>(defaultFilters: QueryType) {
  const [filters, setFilters] = useState<QueryType>(defaultFilters)
  const [, setSearchParams] = useSearchParams()
  const addFilters = (newFilters = {}) => {
    const updatedFilters = {
      ...filters,
      ...(filters.hasOwnProperty('offset') ? { offset: 0 } : {}),
      ...newFilters,
    }
    setSearchParams(queryString.stringify(omit(updatedFilters, ['ordering', 'offset', 'limit'])))
    setFilters(updatedFilters)
  }

  const resetFilters = () => setFilters(defaultFilters)

  return { filters, addFilters, resetFilters }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQueryWithFilters<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResponseType extends PaginationResponse<any>,
  QueryType extends DefaultFiltersType,
>(queryKey: QueryKey, endpoint = '', defaultFilters: QueryType, defaultParams = {}, options = {}) {
  const { filters, addFilters, resetFilters } = useFilters<QueryType>(defaultFilters)
  const prevFilters = usePrevious(filters)
  const result = useQuery<ResponseType>(
    queryKey,
    () => API.get(endpoint, { params: { ...defaultParams, ...filters } }),
    options,
  )

  const refetchWithPagination = () => {
    if (result.data?.results?.length === 1 && (filters?.offset || 0) > 0) {
      addFilters({
        offset: (filters.offset || 0) - (filters.limit || 0),
      })
    } else {
      result.refetch()
    }
  }

  useEffect(() => {
    if (!isEqual(prevFilters, filters) && !result.isFetching) {
      result.refetch()
    }
  }, [filters])

  return {
    ...result,
    filters,
    addFilters,
    resetFilters,
    refetchWithPagination,
  }
}
