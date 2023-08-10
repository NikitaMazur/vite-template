import { ComponentProps, ComponentType, FC, MouseEvent } from 'react'
import { Modal, ModalProps } from '@mui/material'

const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalWrapperProps<T extends ComponentType<any>> = ModalProps &
  Omit<ComponentProps<T>, 'onClose'> & {
    componentProps: ComponentProps<T>
    component: FC<ComponentProps<T> & { onClose: () => void }>
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalWrapper<T extends ComponentType<any>>({
  show,
  component: ModalComponent,
  onHide,
  componentProps,
  ...props
}: ModalWrapperProps<T>) {
  return (
    <Modal {...props} open={show} onClose={onHide}>
      <main onClick={stopPropagation}>
        <ModalComponent {...componentProps} onClose={onHide} />
      </main>
    </Modal>
  )
}
