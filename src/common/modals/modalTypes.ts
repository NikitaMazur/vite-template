import classNames from './ModalWrapper.module.scss'

export const modalTypes = {
  warning: {
    icon: 'exclamation',
    color: 'warning' as const,
    iconClassName: classNames.warning,
  },
  error: {
    icon: 'exclamation',
    color: 'error' as const,
    iconClassName: classNames.caution,
  },
  info: {
    icon: 'information-circle',
    color: 'blue-500' as const,
    iconClassName: classNames.info,
  },
  custom: {
    icon: '',
    color: 'primary' as const,
    iconClassName: classNames.defaultCaution,
  },
}
