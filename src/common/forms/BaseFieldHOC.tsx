import { ComponentProps, ComponentType, useMemo } from 'react'
import { useField } from 'formik'
import isFunction from 'lodash/isFunction'

import formatMetaError from 'common/utils/formatMetaError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseFieldHOCProps<C extends ComponentType<any>> = {
  name: string
  validateOnMount?: boolean
  inputProps?: ComponentProps<C>
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BaseFieldHOC<C extends ComponentType<any>>(Component: C) {
  return function WrappedComponent({
    name,
    validateOnMount = false,
    inputProps,
    onChange,
    onBlur,
    onFocus,
  }: BaseFieldHOCProps<C>) {
    const [field, meta] = useField(name)

    const formattedError = useMemo(
      () => formatMetaError(meta, validateOnMount),
      [meta, validateOnMount],
    )

    const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
      field.onChange && field.onChange(e)
      if (isFunction(onChange)) {
        onChange(e)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      field.onBlur && field.onBlur(e)
      if (isFunction(onBlur)) {
        onBlur(e)
      }
    }

    const props = {
      ...field,
      error: Boolean(inputProps?.error || formattedError),
      helperText: inputProps?.helperText || formattedError,
      onFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      ...(inputProps || {}),
    } as ComponentProps<C>

    return <Component {...props} />
  }
}
