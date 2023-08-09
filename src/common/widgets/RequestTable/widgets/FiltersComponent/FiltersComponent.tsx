import { Fragment, ElementType, Key, ReactNode, useCallback, useMemo } from 'react'
import { FormState } from 'final-form'
import { Form, FormSpy } from 'react-final-form'
import { TableProps } from 'antd'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import noop from 'lodash/noop'

import { PaginationFilters } from 'common/widgets/Pagination'
import { QS } from 'api'
import { useHistory } from 'common/router'

import FiltersComponentView from './FiltersComponentView'

export type FiltersComponentProps<T, F> = {
  additionalButtons?: ReactNode
  isFetched: boolean
  filtersComponent?: ElementType
  selectionComponent?: ElementType
  searchPlaceholder?: string
  selectedRowKeys: Key[]
  getData: (filters?: Partial<F>) => void
  onSelectChange: (keys: Key[]) => void
  refreshData: (filters?: Partial<F>) => void
  rowSelection?: TableProps<T>['rowSelection'] & {
    selectionResultText?: (count: number) => ReactNode
  }
}

export default function FiltersComponent<T, F extends PaginationFilters = PaginationFilters>(
  props: FiltersComponentProps<T, F>,
) {
  const history = useHistory()

  const setFilters = useCallback(
    ({ values }: FormState<object>) => {
      history.replace({
        pathname: history.location.pathname,
        search: QS.buildQueryParams(values),
      })
    },
    [history.location.pathname],
  )

  const debouncedChange = useMemo(() => debounce(setFilters, 300), [setFilters])

  const urlQueries = useMemo(
    () => QS.parseQueryParams<F>(history.location.search),
    [history.location.search],
  )

  return (
    <Form initialValues={urlQueries} initialValuesEqual={isEqual} onSubmit={noop}>
      {() => (
        <Fragment>
          <FormSpy onChange={debouncedChange} subscription={{ values: true }} />
          <FiltersComponentView<T, F>
            {...props}
            resetFilters={() => setFilters({ values: {} } as FormState<object>)}
            filterValues={urlQueries}
          />
        </Fragment>
      )}
    </Form>
  )
}
