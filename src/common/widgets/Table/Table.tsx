import { ReactNode } from 'react'
import { Table as AntdTable, TableProps as ATableProps, ConfigProvider } from 'antd'

import NoResult from 'common/widgets/NoResult'
import { useTranslations } from 'common/language'
import cx from 'common/utils/classnames'

import styles from './Table.module.scss'

export interface TableProps<T extends object = object> extends ATableProps<T> {
  className?: string
  emptyTitle?: string
  emptyDescription?: string
  emptyContent?: ReactNode
}

export default function Table<T extends object = object>({
  className,
  columns,
  dataSource,
  emptyTitle,
  emptyDescription,
  emptyContent,
  ...props
}: TableProps<T>) {
  const { gettext } = useTranslations()

  const EmptyState = () => (
    <div className={styles.empty}>
      {!props.loading && (
        <NoResult
          text={emptyTitle || gettext('No Items Found!')}
          subText={emptyDescription}
          content={emptyContent}
          className={styles.notFoundBlock}
        />
      )}
    </div>
  )

  return (
    <div className={cx(className, styles.table)}>
      <ConfigProvider renderEmpty={EmptyState}>
        <AntdTable columns={columns} dataSource={dataSource} {...props} />
      </ConfigProvider>
    </div>
  )
}
