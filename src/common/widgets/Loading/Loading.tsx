import { ReactNode } from 'react'
import { Spin } from 'antd'

import cx from 'common/utils/classnames'

import LoadingComponent from './widgets/LoadingComponent'
import classNames from './Loading.module.scss'

type Props = {
  isLoading?: boolean
  children?: ReactNode
  isOverlay?: boolean
  className?: string
}

export default function Loading({ isLoading = true, children, isOverlay, className }: Props) {
  return (
    <Spin
      indicator={<LoadingComponent />}
      spinning={isLoading}
      wrapperClassName={cx(
        classNames.loading,
        !isOverlay && isLoading && classNames.withMinHeight,
        className,
      )}
      data-testid="loading"
    >
      {(isOverlay || !isLoading) && children}
    </Spin>
  )
}
