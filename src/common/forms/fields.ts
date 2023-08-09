import BaseFieldHOC from './BaseFieldHOC'
import CheckboxInput from './inputs/CheckboxInput'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput'
import NumberInput from './inputs/NumberInput'

const CheckboxField = BaseFieldHOC(CheckboxInput)
const NumberField = BaseFieldHOC(NumberInput)
const TextField = BaseFieldHOC(TextInput)
const TextAreaField = BaseFieldHOC(TextAreaInput)

export { CheckboxField, NumberField, TextField, TextAreaField }
