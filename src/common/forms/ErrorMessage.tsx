import { ReactNode } from 'react'

import Icon from 'common/widgets/Icon'

import classNames from './styles/ErrorMessage.module.scss'

type Props = {
  text: ReactNode
}

export default function ErrorMessage({ text }: Props) {
  return text ? (
    <span className={classNames.errorMessage}>
      <Icon name="exclamation" />
      <span>{text}</span>
    </span>
  ) : null
}
