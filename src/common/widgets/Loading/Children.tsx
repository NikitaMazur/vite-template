import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Children({ children }: Props) {
  return <>{children}</>
}
