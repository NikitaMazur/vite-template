import { FieldMetaProps } from 'formik'

export default function formatMetaError(
  fieldMeta: FieldMetaProps<unknown>,
  withoutTouched: boolean,
) {
  const error = () => {
    if (fieldMeta.error && (withoutTouched || fieldMeta.touched)) {
      return fieldMeta.error
    }
  }
  const results = error()
  return Array.isArray(results) ? results[0] : results
}
