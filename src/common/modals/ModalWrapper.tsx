import { ComponentProps, ComponentType, MouseEvent } from 'react'
import { Modal, ModalProps } from 'antd'

import cx from 'common/utils/classnames'

import { modalTypes } from './modalTypes'
import ModalTitle, { ModalTitleProps } from './ModalTitle'
import classNames from './ModalWrapper.module.scss'

const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalWrapperProps<T extends ComponentType<any>> = ModalTitleProps &
  ModalProps &
  Omit<ComponentProps<T>, 'onClose'> & {
    show: boolean
    component: T
    destroyOnClose?: boolean
    iconCustomClass?: string
    wrapperClassName?: string
    withModalPadding?: boolean
    onHide: (e?: MouseEvent<HTMLElement>) => void
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalWrapper<T extends ComponentType<any>>({
  show,
  component: ModalComponent,
  iconCustomClass,
  destroyOnClose = true,
  wrapperClassName,
  withModalPadding = true,
  footer = null,
  title,
  description,
  type = 'custom',
  icon,
  onHide,
  ...props
}: ModalWrapperProps<T>) {
  const componentProps = { ...props, onClose: onHide } as ComponentProps<T>

  return (
    <Modal
      {...props}
      open={show}
      onCancel={onHide}
      destroyOnClose={destroyOnClose}
      className={cx(classNames.modalWrapper, wrapperClassName)}
      footer={footer}
    >
      <main
        className={cx(
          classNames.modalContent,
          !icon && !modalTypes[type]?.icon && classNames.withoutIcon,
        )}
        onClick={stopPropagation}
      >
        <ModalTitle
          title={title}
          description={description}
          type={type}
          icon={icon}
          className={iconCustomClass}
        />
        <div className={cx(classNames.modalBody, !withModalPadding && classNames.noPadding)}>
          <ModalComponent {...componentProps} />
        </div>
      </main>
    </Modal>
  )
}
