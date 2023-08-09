import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { configDefaults } from 'vitest/config'


const tiptapMain = [
  '@tiptap/react',
  '@tiptap/starter-kit',
  '@tiptap/suggestion',
]

const tiptapExtensions = [
  '@tiptap-pro/extension-emoji',
  '@tiptap/extension-link',
  '@tiptap/extension-mention',
  '@tiptap/extension-placeholder',
  '@tiptap/extension-table',
  '@tiptap/extension-table-cell',
  '@tiptap/extension-table-header',
  '@tiptap/extension-table-row',
  '@tiptap/extension-text-style',
  '@tiptap/extension-typography',
  '@tiptap/extension-underline',
  '@tiptap/extension-youtube',
  '@tiptap/extension-text-align',
  '@tiptap/extension-task-list',
  '@tiptap-pro/extension-details',
  '@tiptap-pro/extension-details-content',
  '@tiptap-pro/extension-details-summary',
  '@tiptap/extension-font-family',
]

const prosemirrorChunks = [
  'prosemirror-commands',
  'prosemirror-dropcursor',
  'prosemirror-gapcursor',
  'prosemirror-history',
  'prosemirror-keymap',
  'prosemirror-model',
  'prosemirror-schema-list',
  'prosemirror-state',
  'prosemirror-transform',
  'prosemirror-view',
]

const codemirrorChunks = [
  'codemirror',
  '@codemirror/commands',
  '@codemirror/language-data',
  '@codemirror/view',
]

const widgetChunks = [
  'dayjs',
  'final-form',
  'final-form-arrays',
  'react-beautiful-dnd',
  'react-color',
  'react-dropzone',
  'react-easy-crop',
  'react-final-form',
  'react-final-form-arrays',
  'react-helmet',
  'react-select',
  'react-textarea-autosize',
  'react-toastify',
]

const envPrefix = [
  'SENTRY_',
  'APP_NAME',
  'BACKEND_URL',
  'WEBSOCKET_HOST',
  'WEBSOCKET_PROTOCOL',
  'API_URL',
  'STORAGE_KEY',
  'GOOGLE_TAG_ID',
  'CACHE_STATE_KEYS',
  'CACHE_STATE_PERSIST_KEYS',
  'LIMIT',
  'NODE_ENV',
  'TIPTAP_TOKEN',
  'HOST_URL',
  'DEV_SERVER_PORT',
  'APP_URL',
  'CANNY_APP_ID',
]

type Proxy = {
  target: string,
  changeOrigin: boolean,
  ws: boolean,
  secure: boolean,
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
            'lodash': ['lodash'],
            'antd': ['antd'],
            'react': ['react-dom', 'react', 'react-redux', 'redux', 'react-router', 'react-router-dom', 'reselect'],
            'katex': ['katex'],
            'widgets': widgetChunks,
            'tiptap-main': tiptapMain,
            'tiptap-extensions': tiptapExtensions,
            'prosemirror': prosemirrorChunks,
            'codemirror': codemirrorChunks,
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      coverage: {
        exclude: [
          ...(configDefaults.coverage.exclude || []),
          '**/ds-frontend/**',
        ],
      },
      css: true,
    },
    resolve: {
      alias: {
        // TODO: find a solution how to use ds-frontend from the node_modules
        '@ds-frontend': resolve('src/common/ds-frontend/packages'),
        '@img': resolve('src/img'),
        common: resolve('src/common'),
        layouts: resolve('src/layouts'),
        libs: resolve('src/common/libs'),
        pages: resolve('src/pages'),
        store: resolve('src/store'),
        styles: resolve('src/styles'),
        types: resolve('src/types'),
        api: resolve('src/api'),
        init: resolve('src/init'),
        polyfills: resolve('src/polyfills'),
      },
    },
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            title: env.APP_NAME,
            googleTagID: env.GOOGLE_TAG_ID,
          },
        },
      }),
      react(),
      env.SENTRY_DSN && sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        include: './dist',
        authToken: env.SENTRY_AUTH_TOKEN,
        release: env.SENTRY_RELEASE_VERSION,
        ignore: ['node_modules', 'vite.config.ts'],
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
      proxy: JSON.parse(env.PROXY || '[]').reduce((sum: Record<string, Proxy>, cur: string) => ({
        ...sum,
        [cur]: {
          target: env.BACKEND_URL,
          changeOrigin: true,
          ws: true,
          secure: false,
        },
      }), {}),
    },
    preview: {
      port: Number(env.DEV_SERVER_PORT),
      host: env.DEV_SERVER_HOST,
      proxy: JSON.parse(env.PROXY || '[]').reduce((sum: Record<string, Proxy>, cur: string) => ({
        ...sum,
        [cur]: {
          target: env.BACKEND_URL,
          changeOrigin: true,
          ws: true,
          secure: false,
        },
      }), {}),
    },
  }
})
