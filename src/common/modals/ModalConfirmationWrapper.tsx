import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Modal, ModalProps, Row, Col } from 'antd'

import TextInput from 'common/forms/inputs/TextInput'
import ErrorMessage from 'common/forms/ErrorMessage'
import ModalFooter from 'common/widgets/ModalFooter'
import Button, { ButtonProps } from 'common/widgets/Button'
import Icon from 'common/widgets/Icon'
import Typography from 'common/widgets/Typography'
import cx from 'common/utils/classnames'
import { useTranslations } from 'common/language'

import ModalTitle, { ModalTitleProps } from './ModalTitle'
import classNames from './ModalWrapper.module.scss'

const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation()
}

export type ModalConfirmationWrapperProps = ModalTitleProps &
  ModalProps & {
    show: boolean
    wrapperClassName?: string
    submitButtonText?: string
    submitButtonProps?: Partial<ButtonProps>
    cancelButtonText?: string
    withoutCancel?: boolean
    isLoading?: boolean
    validationText?: string
    validationErrorText?: string
    validationFieldLabelText?: string
    onHide: (e: MouseEvent<HTMLElement>) => void
    onSubmit?: () => void
  }

export default function ModalConfirmationWrapper({
  show,
  onHide,
  destroyOnClose = true,
  title,
  description,
  footer = null,
  wrapperClassName,
  submitButtonText,
  submitButtonProps = {},
  cancelButtonText,
  withoutCancel = false,
  onSubmit,
  type = 'error',
  isLoading = false,
  validationText,
  validationErrorText,
  validationFieldLabelText,
  icon,
  ...props
}: ModalConfirmationWrapperProps) {
  const { gettext } = useTranslations()
  const [value, setValue] = useState('')

  const handleSubmit = useCallback(
    async (e: MouseEvent<HTMLElement>) => {
      await onSubmit?.()
      onHide(e)
    },
    [onSubmit, onHide],
  )

  useEffect(() => {
    setValue('')
  }, [show])

  const error = validationText && value !== validationText

  return (
    <Modal
      {...props}
      open={show}
      destroyOnClose={destroyOnClose}
      className={cx(classNames.modalWrapper, wrapperClassName)}
      closeIcon={<Icon name="close" size="large" color="info" />}
      footer={footer}
      onCancel={onHide}
    >
      <main onClick={stopPropagation}>
        <div>
          <div className={classNames.modalContent}>
            <ModalTitle title={title} description={description} type={type} icon={icon} />
            {validationText && (
              <div className={classNames.fieldWrapper}>
                <Row align="top" gutter={[9, 0]}>
                  <Col>
                    <Typography
                      tag="div"
                      size="sm"
                      color="blue-gray-500"
                      className={classNames.validationLabel}
                    >
                      {validationFieldLabelText || gettext('Name')}
                    </Typography>
                  </Col>
                  <Col flex="auto">
                    <TextInput
                      onChange={setValue}
                      value={value}
                      className={classNames.validationField}
                    />
                    {validationErrorText && value && error && (
                      <ErrorMessage text={validationErrorText} />
                    )}
                  </Col>
                </Row>
              </div>
            )}
          </div>
          <ModalFooter withModalPadding={false}>
            {!withoutCancel && (
              <Button onClick={onHide} type="tertiary">
                {cancelButtonText || gettext('Cancel')}
              </Button>
            )}
            {submitButtonText && (
              <Button
                {...submitButtonProps}
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={Boolean(error)}
              >
                {submitButtonText}
              </Button>
            )}
          </ModalFooter>
        </div>
      </main>
    </Modal>
  )
}
