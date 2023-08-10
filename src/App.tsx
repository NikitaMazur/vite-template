import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'

import LanguageProvider from 'common/language/LanguageManager'

import routes from './routes'
import client from './client'

function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <LanguageProvider>
          <RouterProvider router={routes} />
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default AppProvider
