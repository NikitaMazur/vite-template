import { CSSProperties, ComponentType, ElementType, MouseEvent, ReactNode, useMemo } from 'react'

import cx from 'common/utils/classnames'
import { Link, LinkProps } from 'common/router'
import Icon, { IconProps } from 'common/widgets/Icon'
import Spinner from 'common/widgets/Spinner'

import classNames from './Button.module.scss'

type SizeProps = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

const spinnerSize = (size: SizeProps) => {
  switch (size) {
    case 'x-small':
      return 13
    case 'small':
      return 15
    default:
      return 20
  }
}

type CommonProps = {
  children?: ReactNode
  size?: SizeProps
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'text' | 'link' | 'theme' | 'outline'
  icon?: ReactNode | ComponentType
  iconProps?: Omit<IconProps, 'name'>
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  className?: string
  margin?: string
  style?: CSSProperties
  fullWidth?: boolean
  align?: 'left' | 'center' | 'right'
  disabled?: boolean
  tag?: ElementType
  htmlType?: 'submit' | 'button' | 'reset'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  id?: string
  target?: string
  href?: string
  draggable?: boolean
  title?: string
  download?: string
}

export type ButtonProps = CommonProps & LinkProps

export default function Button({
  children,
  tag: Tag = 'button',
  size = 'medium',
  type = 'primary',
  icon,
  iconProps = {},
  iconPosition = 'left',
  isLoading,
  htmlType = 'button',
  className,
  to,
  margin,
  style = {},
  fullWidth,
  align = 'left',
  onClick,
  ...props
}: ButtonProps) {
  const iconComponent = useMemo(() => {
    if (icon && !isLoading) {
      return typeof icon === 'string' ? (
        <Icon name={icon} className={children && classNames[iconPosition]} {...iconProps} />
      ) : (
        icon
      )
    }
    if (isLoading) {
      return (
        <Spinner
          className={cx(classNames.spinner, children && classNames[iconPosition])}
          size={spinnerSize(size)}
        />
      )
    }
    return null
  }, [icon, iconProps, iconPosition, isLoading])

  const Wrapper: ElementType = useMemo<ElementType>(() => (to ? Link : Tag), [to, Tag])

  return (
    <Wrapper
      style={{ margin, ...style }}
      className={cx(
        classNames[size],
        classNames[type],
        classNames[`align-${align}`],
        !icon && isLoading && classNames.loading,
        fullWidth && classNames.fullWidth,
        props.disabled && classNames.disabled,
        className,
      )}
      type={htmlType}
      to={to}
      onClick={isLoading ? undefined : onClick}
      {...props}
    >
      {iconPosition === 'left' && iconComponent}
      {children}
      {iconPosition === 'right' && iconComponent}
    </Wrapper>
  )
}
