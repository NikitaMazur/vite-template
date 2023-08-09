import { ChangeEventHandler, ReactNode, useCallback } from 'react'
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize'
import isNumber from 'lodash/isNumber'

import cx from 'common/utils/classnames'
import Typography from 'common/widgets/Typography'
import { interpolate } from 'common/language'

import classNames from './TextAreaInput.module.scss'

export interface TextAreaInputProps
  extends Omit<TextareaAutosizeProps, 'prefix' | 'onChange' | 'value'> {
  prefix?: ReactNode
  suffix?: ReactNode
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  autoSize?: boolean
  onChange: (value: string) => void
  value: string
}

export default function TextAreaInput({
  className,
  size = 'large',
  error,
  value = '',
  onChange,
  autoSize = false,
  maxRows,
  rows = 2,
  maxLength,
  prefix,
  suffix,
  ...props
}: TextAreaInputProps) {
  const handleChange = useCallback(
    (e) => onChange(e?.target?.value),
    [onChange],
  ) as ChangeEventHandler<HTMLTextAreaElement>

  return (
    <div>
      <div className={cx(classNames.input, classNames[size], error && classNames.error, className)}>
        {prefix}
        <TextareaAutosize
          value={value}
          maxRows={autoSize ? maxRows : rows}
          minRows={rows}
          onChange={handleChange}
          {...props}
        />
        {suffix}
      </div>
      {isNumber(maxLength) && (
        <Typography size="xs" color="blue-gray-400" align="right">
          {interpolate('%s / %s', [value?.length || 0, maxLength])}
        </Typography>
      )}
    </div>
  )
}
