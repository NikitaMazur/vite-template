import { ComponentProps, ComponentType, ReactNode, useMemo } from 'react'
import isFunction from 'lodash/isFunction'
import { FieldRenderProps } from 'react-final-form'

import formatMetaError from 'common/utils/formatMetaError'
import { useTranslations } from 'common/language'
import cx from 'common/utils/classnames'

import ErrorMessage from './ErrorMessage'
import classNames from './styles/BaseFieldLayout.module.scss'

export type BaseFieldLayoutProps = {
  label?: string | ReactNode
  required?: boolean
  layoutClassName?: string
  withoutError?: boolean
  isHorizontal?: boolean
  validateOnMount?: boolean
  error?: string | boolean | ReactNode | null
  helperText?: string | ReactNode
  onBlur?: (e: React.FocusEvent<HTMLElement>, ...args: unknown[]) => void
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T extends ComponentType<any>> = {
  inputComponent: T
} & FieldRenderProps<unknown, HTMLElement> &
  BaseFieldLayoutProps &
  ComponentProps<T>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BaseFieldLayout<T extends ComponentType<any>>({
  label,
  required,
  inputComponent: InputComponent,
  layoutClassName,
  meta,
  input,
  withoutError,
  onChange,
  onBlur,
  onFocus,
  isHorizontal,
  validateOnMount,
  error,
  helperText,
  ...rest
}: Props<T>) {
  const { gettext } = useTranslations()
  const formattedError = useMemo(
    () => formatMetaError(meta, validateOnMount),
    [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError, validateOnMount],
  )

  const handleChange = (e: unknown) => {
    input.onChange && input.onChange(e)
    if (isFunction(onChange)) {
      onChange(e)
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    input.onFocus && input.onFocus(e)
    if (isFunction(onFocus)) {
      onFocus(e)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLElement>, ...args: unknown[]) => {
    input.onBlur && input.onBlur(e)
    if (isFunction(onBlur)) {
      onBlur(e, ...args)
    }
  }

  const componentProps = rest as ComponentProps<T>

  return (
    <div
      className={cx(
        'form-group',
        (formattedError || error) && 'invalid-input',
        classNames.formGroup,
        isHorizontal && classNames.isHorizontal,
        layoutClassName,
      )}
    >
      {label && (
        <label className="control-label">
          {label}
          {!required && <span>{gettext('Optional')}</span>}
        </label>
      )}

      <div className="control-field">
        <div className="control-element">
          <InputComponent
            required={required}
            error={formattedError || error}
            {...componentProps}
            {...input}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {(helperText || !withoutError || formattedError) && (
            <div className={cx(classNames.errorWrapper, 'error-block')}>
              {formattedError ? <ErrorMessage text={formattedError} /> : helperText}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
