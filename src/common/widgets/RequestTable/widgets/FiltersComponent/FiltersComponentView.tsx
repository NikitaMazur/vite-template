import { useEffect, useMemo, useState } from 'react'
import { Row, Col, Badge } from 'antd'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'

import { PaginationFilters } from 'common/widgets/Pagination'
import cx from 'common/utils/classnames'
import usePrevious from 'common/hooks/usePrevious'
import { useTranslations, interpolate } from 'common/language'
import Button from 'common/widgets/Button'
import Icon from 'common/widgets/Icon'
import Typography from 'common/widgets/Typography'
import { TextField } from 'common/forms'

import { FiltersComponentProps } from './FiltersComponent'
import classNames from './FiltersComponent.module.scss'

type Props<T, F> = FiltersComponentProps<T, F> & {
  filterValues: F
  resetFilters: () => void
}

export default function FiltersComponentView<T, F extends PaginationFilters>({
  filterValues,
  isFetched,
  getData,
  refreshData,
  filtersComponent: FiltersComponent,
  selectionComponent: SelectionComponent,
  resetFilters,
  searchPlaceholder,
  selectedRowKeys,
  onSelectChange,
  rowSelection,
  additionalButtons,
}: Props<T, F>) {
  const { gettext, ngettext } = useTranslations()
  const prevFilters = usePrevious(filterValues)

  const isSelectedFilters = useMemo(() => {
    const filters = omit(filterValues, ['search'])
    return Object.values(filters).some(Boolean)
  }, [filterValues])

  const [isVisible, setVisible] = useState(isSelectedFilters)

  useEffect(() => {
    if (isFetched && !isEqual(prevFilters, filterValues)) {
      getData(filterValues)
    }
  }, [filterValues])

  return (
    <div className={classNames.filtersWrapper}>
      <div className={classNames.searchBlock}>
        <Row gutter={[16, 0]} align="middle">
          {FiltersComponent && (
            <Col>
              <Button
                className={cx(classNames.filtersButton, isSelectedFilters && classNames.isSelected)}
                onClick={() => setVisible(!isVisible)}
                type="tertiary"
                size="small"
                icon={
                  <Badge dot={isSelectedFilters} color="#3F7A36" className={classNames.filterIcon}>
                    <Icon name="filter" size="small" color="info" />
                  </Badge>
                }
              >
                {gettext('Filter')}
              </Button>
            </Col>
          )}
          <Col>
            <TextField
              name="search"
              placeholder={searchPlaceholder || gettext('Search')}
              prefix={<Icon name="search" size="small" color="info" />}
              size="medium"
              withoutError
              className={classNames.search}
            />
          </Col>
          <Col style={{ marginLeft: 'auto' }}>
            {additionalButtons}
            <Button
              icon="refresh"
              iconProps={{
                color: 'info',
              }}
              type="tertiary"
              size="small"
              className={classNames.refreshButton}
              onClick={() => refreshData()}
            >
              {gettext('Refresh')}
            </Button>
          </Col>
        </Row>
      </div>
      {FiltersComponent && isVisible && (
        <div className={classNames.filtersBlock}>
          <Row align="middle" gutter={[16, 0]}>
            <Col>
              <Typography size="sm" color="blue-gray-400" fontWeight={500}>
                {gettext('Filters')}:
              </Typography>
            </Col>
            <Col>
              <FiltersComponent />
            </Col>
            <Col>
              <Button onClick={resetFilters} type="link">
                <Typography size="sm" color="blue-700" fontWeight={600}>
                  {gettext('Clear all')}
                </Typography>
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {SelectionComponent && !isEmpty(selectedRowKeys) && (
        <div className={classNames.filtersBlock}>
          <Row align="middle" gutter={[16, 0]}>
            <Col>
              <Typography size="sm" color="blue-gray-400" fontWeight={500}>
                {rowSelection?.selectionResultText ? (
                  rowSelection.selectionResultText(selectedRowKeys.length)
                ) : (
                  <span>
                    {interpolate(
                      ngettext('%s Item selected', '%s Items selected', selectedRowKeys.length),
                      [selectedRowKeys.length],
                    )}
                    :
                  </span>
                )}
              </Typography>
            </Col>
            <Col>
              <SelectionComponent selectedRowKeys={selectedRowKeys} refreshData={refreshData} />
            </Col>
            <Col>
              <Button onClick={() => onSelectChange([])} type="link">
                <Typography size="sm" color="blue-700" fontWeight={600}>
                  {gettext('Clear all')}
                </Typography>
              </Button>
            </Col>
          </Row>
        </div>
      )}
      {filterValues.search && (
        <div className={classNames.searchResults}>
          {gettext('Search results for')}: <span>‘{filterValues.search}’</span>
        </div>
      )}
    </div>
  )
}
