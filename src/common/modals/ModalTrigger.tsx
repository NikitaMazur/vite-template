import {
  Children,
  ComponentType,
  cloneElement,
  ElementType,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  Fragment,
  useEffect,
} from 'react'
import isFunction from 'lodash/isFunction'

import ModalWrapper, { ModalWrapperProps } from './ModalWrapper'

export type ModalTriggerProps = {
  children: ReactNode
  modalWrapper?: ElementType
  modalDisabled?: boolean
  defaultOpened?: boolean
  onModalOpen?: () => void
  onModalClose?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<T extends ComponentType<any>> = Omit<ModalWrapperProps<T>, 'show' | 'onHide'> &
  ModalTriggerProps

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalTrigger<T extends ComponentType<any>>({
  children,
  modalWrapper: WrapperComponent = ModalWrapper,
  modalDisabled = false,
  defaultOpened = false,
  onModalOpen,
  onModalClose,
  ...props
}: Props<T>) {
  const [isToggled, setToggled] = useState(defaultOpened)

  useEffect(() => {
    setToggled(defaultOpened)
  }, [defaultOpened])

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      e.preventDefault()
      setToggled(true)
      isFunction(onModalOpen) && onModalOpen()
    },
    [setToggled],
  )

  const handleClose = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e && e.stopPropagation()
      isFunction(onModalClose) && onModalClose()
      setToggled(false)
    },
    [setToggled],
  )

  // ensure that we have only one child (control element)
  const child = useMemo(() => {
    return modalDisabled || !children
      ? children
      : cloneElement(Children.only(children), { onClick: handleOpen })
  }, [modalDisabled, children, handleOpen])

  return (
    <Fragment>
      {child}
      <WrapperComponent {...props} show={isToggled} onHide={handleClose} />
    </Fragment>
  )
}
