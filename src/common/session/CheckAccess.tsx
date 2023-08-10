import { ReactNode, useMemo } from 'react'

import AccessType, * as accesses from './access'

type Props = {
  access: AccessType | AccessType[]
  rule?: 'some' | 'every'
  fallback?: ReactNode
  children: ReactNode
}

export default function CheckAccess({ access, rule = 'some', fallback, children }: Props) {
  const level = useMemo(() => new Set([accesses.F_PUBLIC]), [])

  return [access].flat()[rule]((a) => level.has(a)) ? children : fallback
}
