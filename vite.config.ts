import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'

const envPrefix = [
  'SENTRY_',
  'APP_NAME',
  'BACKEND_URL',
  'API_URL',
  'NODE_ENV',
  'HOST_URL',
  'DEV_SERVER_PORT',
  'APP_URL',
]

type Proxy = {
  target: string
  changeOrigin: boolean
  ws: boolean
  secure: boolean
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    envPrefix,
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            lodash: ['lodash'],
            mui: ['@mui/lab', '@mui/material', '@emotion/react', '@emotion/styled'],
            react: ['react-dom', 'react', 'react-router', 'react-router-dom'],
            formik: ['formik', 'formik-mui', 'formik-mui-x-date-pickers'],
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      css: true,
    },
    resolve: {
      alias: {
        '@img': resolve('src/img'),
        common: resolve('src/common'),
        layouts: resolve('src/layouts'),
        pages: resolve('src/pages'),
        styles: resolve('src/styles'),
        types: resolve('src/types'),
        api: resolve('src/api'),
      },
    },
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            title: env.APP_NAME,
          },
        },
      }),
      react(),
      env.SENTRY_DSN &&
        sentryVitePlugin({
          org: env.SENTRY_ORG,
          project: env.SENTRY_PROJECT,
          authToken: env.SENTRY_AUTH_TOKEN,
          release: {
            name: env.SENTRY_RELEASE_VERSION,
          },
          sourcemaps: {
            ignore: ['node_modules', 'vite.config.ts'],
          },
        }),
    ].filter(Boolean),
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      modules: {
        localsConvention: 'camelCase',
        exportGlobals: true,
      },
    },
    server: {
      port: Number(env.DEV_SERVER_PORT),
      host: env.DEV_SERVER_HOST,
      proxy: JSON.parse(env.PROXY || '[]').reduce(
        (sum: Record<string, Proxy>, cur: string) => ({
          ...sum,
          [cur]: {
            target: env.BACKEND_URL,
            changeOrigin: true,
            ws: true,
            secure: false,
          },
        }),
        {},
      ),
    },
    preview: {
      port: Number(env.DEV_SERVER_PORT),
      host: env.DEV_SERVER_HOST,
      proxy: JSON.parse(env.PROXY || '[]').reduce(
        (sum: Record<string, Proxy>, cur: string) => ({
          ...sum,
          [cur]: {
            target: env.BACKEND_URL,
            changeOrigin: true,
            ws: true,
            secure: false,
          },
        }),
        {},
      ),
    },
  }
})
