import { ReactNode } from 'react'

import cx from 'common/utils/classnames'
import Typography from 'common/widgets/Typography'
import icon from '@img/no-search-result.svg'

import styles from './NoResult.module.scss'

type Props = {
  img?: ImageData
  text?: string
  subText?: string
  content?: ReactNode
  className?: string
}

export default function NoResult({ img, text, subText, content, className }: Props) {
  return (
    <div className={cx(styles.wrapper, className)}>
      <img src={img || icon} alt="not-found" />
      <Typography tag="h4" size="xl" fontWeight={600} margin="lg">
        {text}
      </Typography>
      <Typography tag="div" color="blue-gray-500">
        {subText}
      </Typography>
      {content}
    </div>
  )
}
