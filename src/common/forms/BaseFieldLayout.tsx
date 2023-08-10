import { ReactNode } from 'react'
import { Box, BoxProps } from '@mui/material'

type BaseFieldLayoutProps = {
  box?: BoxProps
  children: ReactNode
}

export default function BaseFieldLayout({ children, box }: BaseFieldLayoutProps) {
  return <Box {...box}>{children}</Box>
}
