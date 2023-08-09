import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useState,
  KeyboardEvent,
  InputHTMLAttributes,
  MutableRefObject,
} from 'react'

import cx from 'common/utils/classnames'
import Button from 'common/widgets/Button'
import { ESCAPE } from 'common/constants/hotkeys'

import classNames from './TextInput.module.scss'

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'onChange' | 'onSubmit'> {
  inputRef?: MutableRefObject<HTMLInputElement | null>
  className?: string
  size?: 'small' | 'medium' | 'large' | 'x-large'
  error?: string | boolean | object
  prefix?: ReactNode
  sufix?: ReactNode
  value: string
  onChange: (value: string) => void
  modification?: (value: string) => string
  type?: string
  passwordPreview?: boolean
}

export default function TextInput({
  inputRef,
  className,
  size = 'large',
  error,
  prefix,
  sufix,
  value = '',
  onChange,
  modification,
  disabled,
  type = 'text',
  passwordPreview = false,
  onBlur,
  ...props
}: TextInputProps) {
  const [inputType, setInputType] = useState(type)
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (modification) {
        onChange(modification(e?.target?.value))
      } else {
        onChange(e?.target?.value)
      }
    },
    [onChange, modification],
  )

  const toggleInputType = useCallback(
    () => setInputType((type) => (type === 'password' ? 'text' : 'password')),
    [],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ESCAPE) {
      e.currentTarget.blur()
      return false
    }
  }

  return (
    <div
      className={cx(
        classNames.input,
        classNames[size],
        disabled && classNames.disabled,
        error && classNames.error,
        className,
      )}
    >
      {prefix && (
        <span className={cx(classNames.icon, value && classNames.hasValue)}>{prefix}</span>
      )}
      <input
        ref={inputRef}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        type={inputType}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        {...props}
      />
      {sufix && (
        <span className={cx(classNames.icon, classNames.sufix, value && classNames.hasValue)}>
          {sufix}
        </span>
      )}
      {type === 'password' && passwordPreview && (
        <Button
          icon={inputType === 'password' ? 'eye' : 'eye-off'}
          iconProps={{ color: 'info' }}
          type="link"
          onClick={toggleInputType}
          margin="0 0 0 10px"
          disabled={disabled}
        />
      )}
    </div>
  )
}
