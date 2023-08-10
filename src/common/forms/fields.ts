import { TextField as TextInput, Select } from 'formik-mui'

import BaseFieldHOC from './BaseFieldHOC'

const TextField = BaseFieldHOC(TextInput)
const SelectField = BaseFieldHOC(Select)

export { TextField, SelectField }
