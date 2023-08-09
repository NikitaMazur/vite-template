import { FORM_ERROR } from 'final-form'
import { FormRenderProps } from 'react-final-form'
import omit from 'lodash/omit'
import get from 'lodash/get'

export const getFormErrors = (err: object) => {
  const fieldErrors = omit(err, ['response', 'detail', 'non_field_errors'])
  const generalError = get(err, 'code') || get(err, 'detail') || get(err, 'non_field_errors') || ''

  return {
    ...fieldErrors,
    [FORM_ERROR]: generalError,
  }
}

export const isFormValid = (
  form?: Pick<
    FormRenderProps,
    'dirty' | 'hasValidationErrors' | 'hasSubmitErrors' | 'dirtySinceLastSubmit'
  >,
) => {
  if (!form?.dirty) {
    return false
  }
  if (form?.hasValidationErrors) {
    return false
  }
  if (form?.hasSubmitErrors && !form?.dirtySinceLastSubmit) {
    return false
  }
  return true
}
