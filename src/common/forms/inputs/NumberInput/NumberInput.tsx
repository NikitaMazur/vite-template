import { useCallback, useState } from 'react'
import { InputNumber, InputNumberProps } from 'antd'

import Icon from 'common/widgets/Icon'
import cx from 'common/utils/classnames'

import classNames from './NumberInput.module.scss'

export interface NumberInputProps extends Omit<InputNumberProps<number>, 'size'> {
  className?: string
  size?: 'small' | 'medium' | 'large'
  error?: string
  minWidth?: number | string
  isDynamicWidth?: boolean
  max?: number
  min?: number
  onChange: (v: number) => void
}

export default function NumberInput({
  className,
  size = 'large',
  error,
  minWidth,
  isDynamicWidth = false,
  max,
  min,
  onChange,
  ...props
}: NumberInputProps) {
  const [width, setWidth] = useState(isDynamicWidth ? minWidth : undefined)
  const handleInput = useCallback((value: string) => {
    setWidth(`calc(${value.length}ch + 16px)`) // 16px is added because of controls
  }, [])

  const handleChange = useCallback(
    (value: number) => {
      let val = value
      if (max !== undefined && val > max) {
        val = max
      }
      if (min !== undefined && val < min) {
        val = min
      }
      onChange(val)
    },
    [max, min, onChange],
  )

  return (
    <InputNumber
      style={{ minWidth, width }}
      controls={{
        upIcon: <Icon name="plus-add" size="x-small" color="info" className={classNames.icon} />,
        downIcon: <Icon name="minus" size="x-small" color="info" className={classNames.icon} />,
      }}
      className={cx(classNames.input, classNames[size], error && classNames.error, className)}
      type="number"
      onInput={isDynamicWidth ? handleInput : undefined}
      onChange={handleChange}
      {...props}
    />
  )
}
