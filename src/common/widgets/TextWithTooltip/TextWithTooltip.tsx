import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipProps } from 'antd'

import cx from 'common/utils/classnames'
import Typography, { TypographyProps } from 'common/widgets/Typography'

import classNames from './TextWithTooltip.module.scss'

type Props = TypographyProps & {
  text: string
  className?: string
  tooltipProps?: Partial<TooltipProps>
}

function TextWithTooltip({ text, className, tooltipProps, ...props }: Props) {
  const [hiddenTooltip, hideTooltip] = useState(true)
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (textRef.current === null) {
        return
      }

      if (textRef.current.scrollWidth > textRef.current.offsetWidth) {
        hideTooltip(false)
      } else {
        hideTooltip(true)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [text])

  return (
    <Tooltip {...tooltipProps} title={hiddenTooltip ? '' : text}>
      <Typography ref={textRef} className={cx(classNames.typography, className)} {...props}>
        {text}
      </Typography>
    </Tooltip>
  )
}

export default TextWithTooltip
