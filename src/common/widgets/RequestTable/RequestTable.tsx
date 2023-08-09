import {
  Key,
  useCallback,
  useState,
  useMemo,
  useEffect,
  Fragment,
  ReactNode,
  ElementType,
} from 'react'
import { useLocation } from 'react-router'
import { TablePaginationConfig } from 'antd'
import { SorterResult } from 'antd/lib/table/interface'
import get from 'lodash/get'
import isObject from 'lodash/isObject'

import { PaginationResponse } from 'types'
import { ResourceType } from 'common/hooks/useResource'
import { QS } from 'api'
import { useTranslations, interpolate } from 'common/language'
import Pagination, { PaginationFilters } from 'common/widgets/Pagination'
import Table, { TableProps } from 'common/widgets/Table'

import FiltersComponent from './widgets/FiltersComponent'
import classNames from './RequestTable.module.scss'

interface RequestTableProps<
  T extends object = object,
  F extends PaginationFilters = PaginationFilters,
> extends TableProps<T> {
  resource: ResourceType<PaginationResponse<T>, F>
  requestParams?: object
  emptyTitle?: string
  emptyDescription?: string
  emptyContent?: ReactNode
  destroyOnUnmount?: boolean
  filtersComponent?: ElementType
  selectionComponent?: ElementType
  searchPlaceholder?: string
  additionalButtons?: ReactNode
  rowSelection?: TableProps<T>['rowSelection'] & {
    selectionResultText?: (count: number) => ReactNode
  }
}

export default function RequestTable<
  T extends object = object,
  F extends PaginationFilters = PaginationFilters,
>({
  resource,
  requestParams,
  emptyTitle,
  emptyDescription,
  emptyContent,
  filtersComponent,
  selectionComponent,
  destroyOnUnmount = true,
  searchPlaceholder,
  rowSelection,
  additionalButtons,
  ...props
}: RequestTableProps<T, F>) {
  const { search } = useLocation()
  const isSearchParam = useMemo(
    () => QS.parseQueryParams<{ search?: string }>(search).search,
    [search],
  )
  const { gettext } = useTranslations()
  const [request, setRequest] = useState<ReturnType<ResourceType<unknown>['create']> | null>(null)
  const [isFetched, setFetched] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const location = useLocation()

  const getData = useCallback(
    (data: Partial<F> | undefined = resource.filters) => {
      request?.cancel?.()
      const newRequest = resource.fetch({
        offset: 0,
        ...data,
        ...requestParams,
      })
      setRequest(newRequest)
      newRequest.then((resp) => {
        setFetched(true)
        setSelectedRowKeys([])
        return resp
      })
      return newRequest
    },
    [resource.fetch, resource.filters, request, requestParams],
  )

  const refreshData = useCallback(
    (filtersData = {}) => {
      return getData({ ...filtersData, ...resource.filters })
    },
    [getData, resource.filters],
  )

  const generateRows = useMemo(
    () =>
      get(resource, 'data.results', []).map((item, index) => ({
        ...item,
        key: 'uuid' in item ? item.uuid : index,
      })),
    [resource.data],
  )

  const onSelectChange = (newSelectedRowKeys: Key[] = []) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleTableChange = useCallback(
    (
      _: TablePaginationConfig,
      __: Record<string, unknown>,
      sorter: SorterResult<T> | SorterResult<T>[],
    ) => {
      if (Array.isArray(sorter)) {
        return
      }

      if (sorter.order === 'ascend') {
        getData({ ...resource.filters, ordering: sorter.field })
      } else if (sorter.order === 'descend') {
        getData({ ...resource.filters, ordering: `-${sorter.field}` })
      } else {
        getData({ ...resource.filters, ordering: undefined })
      }
    },
    [resource.filters],
  )

  const rowSelectionDefault = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 50,
  }

  useEffect(() => {
    getData(QS.parseQueryParams<F>(location.search))
    if (destroyOnUnmount) {
      return resource.clear
    }
  }, [])

  return (
    <Fragment>
      <div className={classNames.tableWrapper}>
        <FiltersComponent<T, F>
          getData={getData}
          refreshData={refreshData}
          isFetched={isFetched}
          filtersComponent={filtersComponent}
          selectionComponent={selectionComponent}
          searchPlaceholder={searchPlaceholder}
          selectedRowKeys={selectedRowKeys}
          onSelectChange={onSelectChange}
          rowSelection={rowSelection}
          additionalButtons={additionalButtons}
        />
        <Table
          {...props}
          rowSelection={
            rowSelection
              ? {
                  ...rowSelectionDefault,
                  ...(isObject(rowSelection) ? rowSelection : {}),
                }
              : undefined
          }
          dataSource={generateRows}
          pagination={false}
          loading={resource.isLoading}
          emptyTitle={isSearchParam ? gettext("We couldn't find a match") : emptyTitle}
          emptyDescription={
            isSearchParam
              ? interpolate(
                  gettext("We couldn't find a match for ”%s”. Please try another search"),
                  [isSearchParam],
                )
              : emptyDescription
          }
          emptyContent={isSearchParam ? null : emptyContent}
          onChange={handleTableChange}
        />
      </div>
      {Number(resource?.data?.count) > Number(resource?.filters?.limit) && (
        <div className={classNames.paginationWrapper}>
          <Pagination<F>
            filters={resource.filters}
            count={resource.data?.count || 0}
            fetchData={getData}
            dataLength={resource.data?.results?.length || 0}
            showLessItems
            showSizeChanger={false}
          />
        </div>
      )}
    </Fragment>
  )
}
