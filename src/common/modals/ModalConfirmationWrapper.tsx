import { MouseEvent, useCallback } from 'react'
import { Button, Modal, ModalProps, Typography } from '@mui/material'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'

import { useTranslations } from 'common/language'

const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation()
}

export type ModalConfirmationWrapperProps = ModalProps & {
  show: boolean
  submitButtonText?: string
  submitButtonProps?: LoadingButtonProps
  cancelButtonText?: string
  withoutCancel?: boolean
  isLoading?: boolean
  onHide: (e: MouseEvent<HTMLElement>) => void
  onSubmit?: () => void
  description: string
}

export default function ModalConfirmationWrapper({
  show,
  onHide,
  title,
  description,
  submitButtonText,
  submitButtonProps = {},
  cancelButtonText,
  withoutCancel = false,
  onSubmit,
  isLoading = false,
  ...props
}: ModalConfirmationWrapperProps) {
  const { gettext } = useTranslations()

  const handleSubmit = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      await onSubmit?.()
      onHide(e)
    },
    [onSubmit, onHide],
  )

  return (
    <Modal {...props} open={show} onClose={onHide}>
      <main onClick={stopPropagation}>
        <div>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5">{description}</Typography>
          <div>
            {!withoutCancel && (
              <Button onClick={onHide}>{cancelButtonText || gettext('Cancel')}</Button>
            )}
            {submitButtonText && (
              <LoadingButton
                {...submitButtonProps}
                onClick={handleSubmit}
                loading={isLoading}
                loadingPosition="start"
              >
                {submitButtonText}
              </LoadingButton>
            )}
          </div>
        </div>
      </main>
    </Modal>
  )
}
