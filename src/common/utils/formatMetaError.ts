import { FieldMetaState } from 'react-final-form'

export default function formatMetaError(
  fieldMeta: FieldMetaState<unknown>,
  withoutTouched: boolean,
) {
  const error = () => {
    if (fieldMeta.submitError && !fieldMeta.dirtySinceLastSubmit) {
      return fieldMeta.submitError
    }
    if (fieldMeta.error && (withoutTouched || fieldMeta.touched)) {
      return fieldMeta.error
    }
  }
  const results = error()
  return Array.isArray(results) ? results[0] : results
}
