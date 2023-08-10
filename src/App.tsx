import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material'

import LanguageProvider from 'common/language/LanguageManager'

import routes from './routes'
import client from './client'

const theme = createTheme({})

function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
          </ThemeProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default AppProvider
