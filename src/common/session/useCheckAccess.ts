import { useMemo } from 'react'

import AccessType, * as accesses from './access'

export default function useCheckAccess(access?: AccessType | AccessType[] | null) {
  const level = useMemo(() => new Set([accesses.F_PUBLIC]), [])
  return [access].flat().map((acc) => level.has(acc || ''))
}
