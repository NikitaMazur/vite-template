import { useCallback } from 'react'
import { Checkbox, CheckboxProps } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

import cx from 'common/utils/classnames'

import classNames from './CheckboxInput.module.scss'

interface Props extends Omit<CheckboxProps, 'onChange'> {
  className?: string
  onChange: (value: boolean) => void
}

export default function CheckboxInput({ className, value, onChange, ...props }: Props) {
  const handleChange = useCallback(
    (e: CheckboxChangeEvent) => onChange(e.target.checked),
    [onChange],
  )

  return (
    <Checkbox
      {...props}
      type="checkbox"
      className={cx(classNames.checkbox, className)}
      checked={value}
      onChange={handleChange}
    />
  )
}
