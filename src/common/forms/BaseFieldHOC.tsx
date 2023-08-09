import { ComponentProps, ComponentType } from 'react'
import { Field, FieldProps } from 'react-final-form'

import BaseFieldLayout, { BaseFieldLayoutProps } from './BaseFieldLayout'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BaseFieldHOC<T extends ComponentType<any>>(Component: T) {
  return function WrappedComponent({
    name,
    ...props
  }: FieldProps<ComponentProps<T>['value'], ComponentProps<T>> &
    Omit<ComponentProps<T>, 'value' | 'onChange'> &
    BaseFieldLayoutProps) {
    return (
      <Field
        name={name}
        component={BaseFieldLayout}
        inputComponent={Component}
        parse={identity}
        {...props}
      />
    )
  }
}

// https://github.com/final-form/react-final-form/issues/130
function identity(value: unknown) {
  return value
}
