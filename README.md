![Project status](https://img.shields.io/static/v1?label=status&message=in-progress&color=brightgreen?style=for-the-badge)

# React FE project

## Table of Contents

- [React FE project](#react-fe-project)
  - [Table of Contents](#table-of-contents)
  - [Local Development URLs](#local-development-urls)
  - [Hosted Development URLs](#hosted-development-urls)
  - [General Information](#general-information)
  - [Key Technologies Used](#key-technologies-used)
  - [Setup](#setup)
  - [Env variables](#env-variables)
  - [Usage](#usage)
  - [TODO](#todo)

## Local Development URLs

- **Frontend client**: `http://localhost:3000/`. This is the default URL for the frontend client identified by the `DEV_SERVER_HOST` and the `DEV_SERVER_PORT` environment variables.

## Hosted Development URLs

## General Information

## Key Technologies Used

- [ViteJS](https://vitejs.dev/)
- [ReactJS v18](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [ReduxJS](https://redux.js.org/)
- [DS frontend package](https://github.com/django-stars/ds-frontend/tree/master/packages/resource)
- [Vitest](https://vitest.dev/)
- [Ant Design v4+](https://4x.ant.design/)
- [React Final Form](https://final-form.org/react)
- [Lodash](https://lodash.com/)
- [DayJS](https://day.js.org/)
- CSS Modules (SCSS format)
- Yarn

## Setup

- Install Node v18.16.0 or run `nvm use` if you have this [package](https://github.com/nvm-sh/nvm)
- Setup ESLint for preferred code editor
- Install yarn globally (https://yarnpkg.com/getting-started/install)
- Copy `.env.example` file and create `.env.local` with required settings

## Env variables

- `APP_NAME`: general app name to identificate project
- `BACKEND_URL`: url for backend API requests
- `HOST_URL`: the host to the site, without campus subdomains
- `WEBSOCKET_HOST`: url for proxying web sockets in development mode
- `WEBSOCKET_PROTOCOL`: the WebSocket protocol, `ws://` without TSL and `wss://` with TSL
- `API_URL`: url prefix for API requests, helps to avoid duplication on each request
- `DEV_SERVER_PORT`: port for dev server
- `DEV_SERVER_HOST`: host for dev server
- `STORAGE_KEY`: key used to identify application object properites in localStorage
- `GOOGLE_TAG_ID`: Google Tag Manager ID
- `CACHE_STATE_KEYS`: what to store, set empty or null to store all state
- `CACHE_STATE_PERSIST_KEYS`: persisted store information after "Clear" action
- `LIMIT`: default limit for resources with pagination
- `SENTRY_ORG`: Sentry organization
- `SENTRY_PROJECT`: Sentry project
- `SENTRY_AUTH_TOKEN`: Sentry auth token
- `SENTRY_DSN`: Sentry DSN
- `SENTRY_ENVIRONMENT`: Sentry environment
- `SENTRY_RELEASE_VERSION`: Sentry release version

## Usage

Install required packages:

`yarn install`

Run app in development mode:

`yarn start`

Run production build:

`yarn build`

Run ESlint and Stylelint checks:

`yarn lint`

Run ESlint and Stylelint checks and fix all fixable issues:

`yarn lint:fix`

Run Vitest test cases:

`yarn test`
