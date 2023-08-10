import { BaseTextFieldProps, TextField } from '@mui/material'

export type TextInputProps = BaseTextFieldProps

export default function TextInput(props: TextInputProps) {
  return <TextField {...props} />
}
