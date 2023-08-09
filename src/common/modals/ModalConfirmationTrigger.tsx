import ModalTrigger, { ModalTriggerProps } from './ModalTrigger'
import ModalConfirmationWrapper, { ModalConfirmationWrapperProps } from './ModalConfirmationWrapper'

type Props = Omit<ModalTriggerProps, 'modalWrapper'> &
  Omit<ModalConfirmationWrapperProps, 'show' | 'onHide'>

export default function ModalConfirmationTrigger(props: Props) {
  return <ModalTrigger modalWrapper={ModalConfirmationWrapper} {...props} />
}
