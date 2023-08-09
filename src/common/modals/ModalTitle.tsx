import { ReactNode } from 'react'

import cx from 'common/utils/classnames'
import Icon, { IconProps } from 'common/widgets/Icon'
import Typography from 'common/widgets/Typography'

import { modalTypes } from './modalTypes'
import classNames from './ModalWrapper.module.scss'

export type ModalTitleProps = {
  title?: ReactNode
  description?: ReactNode
  type?: 'warning' | 'error' | 'custom' | 'info'
  icon?: IconProps['name']
  className?: string
}

export default function ModalTitle({
  title,
  description,
  type = 'custom',
  icon,
  className,
}: ModalTitleProps) {
  return (
    <div className={classNames.titleWrapper}>
      {(icon || modalTypes[type]?.icon) && (
        <div className={cx(modalTypes[type]?.iconClassName, className)}>
          <Icon
            name={icon || modalTypes[type]?.icon}
            size="large"
            color={modalTypes[type]?.color}
          />
        </div>
      )}
      {title && (
        <Typography tag="h5" size="lg" fontWeight={600} margin={description ? 'md' : undefined}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography tag="div" size="sm" color="blue-gray-500">
          {description}
        </Typography>
      )}
    </div>
  )
}
