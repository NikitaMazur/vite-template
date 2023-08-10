import { TextField as TextInput } from '@mui/material'

import BaseFieldHOC from './BaseFieldHOC'
// import TextInput, { TextInputProps } from './inputs/TextInput'

const TextField = BaseFieldHOC(TextInput)

export { TextField }
