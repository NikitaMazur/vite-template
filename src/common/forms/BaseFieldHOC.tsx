import { ComponentProps, ComponentType } from 'react'
import { Field, FieldConfig } from 'formik'
import { BoxProps } from '@mui/material'

import BaseFieldLayout from './BaseFieldLayout'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseFieldHOCProps<C extends ComponentType<any>> = Omit<
  ComponentProps<C>,
  'field' | 'form' | 'meta'
> &
  FieldConfig & { box?: BoxProps }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BaseFieldHOC<C extends ComponentType<any>>(Component: C) {
  return function WrappedComponent({
    name,
    as,
    onChange,
    onBlur,
    validate,
    box,
    ...rest
  }: BaseFieldHOCProps<C>) {
    return (
      <BaseFieldLayout box={box}>
        <Field {...rest} name={name} validate={validate} as={as} component={Component} />
      </BaseFieldLayout>
    )
  }
}
