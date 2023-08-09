import { useSelector, shallowEqual } from 'react-redux'

import { userLevelSelector } from './access'

export default function useCheckAccess(accesses?: string | string[] | null) {
  const state = useSelector((state) => state, shallowEqual)
  const level = userLevelSelector({
    ...state,
  })
  return [accesses].flat().map((acc) => level.includes(acc || ''))
}
