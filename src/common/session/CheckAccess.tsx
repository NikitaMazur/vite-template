import { Fragment, ReactNode } from 'react'

import useCheckAccess from './useCheckAccess'

export type CheckAccessProps = {
  access?: string | string[] | null
  accessRule?: 'some' | 'every'
  fallback?: ReactNode
  children: ReactNode
}

export default function CheckAccess({
  access,
  accessRule = 'some',
  fallback,
  children,
}: CheckAccessProps) {
  if (access === undefined) {
    return <Fragment>{children}</Fragment>
  }
  const hasAccesses = useCheckAccess(access)
  return <Fragment>{hasAccesses[accessRule](Boolean) ? children : fallback}</Fragment>
}
