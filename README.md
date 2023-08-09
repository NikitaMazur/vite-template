![Project status](https://img.shields.io/static/v1?label=status&message=in-progress&color=brightgreen?style=for-the-badge)

# Illumidesk FE project

IllumiDesk follows the [12 factor app methodology](https://12factor.net/) and is built with a microservices architecture in mind. Environments are configured with environment variables and the application is built with a single codebase. The values below are the default values for local development and for the AWS hosted shared development environment.

## Table of Contents

- [Illumidesk FE project](#illumidesk-fe-project)
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

* **Frontend client**: `http://localhost:3000/`. This is the default URL for the frontend client identified by the `DEV_SERVER_HOST` and the `DEV_SERVER_PORT` environment variables.
* **Backend API**: http://localhost:8000/. This is the default URL for the backend API identified by the `BACKEND_URL` environment variable.
* **Backend WebSockets**: `ws://localhost:8001/`. This is the backend WebSockets URL identified by the `WEBSOCKET_PROTOCOL` and the `WEBSOCKET_HOST` environment variable.
* **Django Admin**: http://localhost:8000/_platform/admin/

## Hosted Development URLs

The environment variables mentioned above are set using values saved in the `AWS SSM Parameter Store` and are set with `GitHub Actions` when deploying to the Development environment.

The values below are the default values for the AWS hosted shared development environment.

- **Frontend client**: `https://app.dev.illumidesk.com/`.
- **Backend API**: `https://api.dev.illumidesk.com/`.
- **Backend WebSockets**: `wss://api.dev.illumidesk.com/`.
- **Django Admin**: `https://api.dev.illumidesk.com/_platform/admin/`

Additionally, the hosted Development environment frontend sends data to the following services:

- **Sentry**: https://sentry.io/organizations/illumidesk/projects/illumidesk-client/?project=6609125
- **Google Tag Manager**: https://tagmanager.google.com/#/home

## General Information

IllumiDesk is a HigherEd solution for content managers and instructors that want to teach and learn data-driven subjects more effectively.

Additionally, students are able to get big productivity boosts with in-browser learning environments and enhanced collaboration features.

Features such as auto-grading engines for instructors, AI-driven activity designers for content managers, and ML/DL tutors for students help organizations achieve their training milestones more effectively at scale.

Furthermore, with direct integrations with the leading learning management systems in the market, you'll be able to get up and running quickly and easily.

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
- `BACKEND_URL`: url for backend API requests (https://app-dev.illumidesk.com)
- `HOST_URL`: the host to the site, without campus subdomains (dev.illumidesk.com)
- `WEBSOCKET_HOST`: url for proxying web sockets in development mode (app-dev.illumidesk.com)
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

## TODO

Include areas you believe need improvement / could be improved. Also add TODOs for future development.

- TypeScript coverage
- Utils/widgets/reusable components unit test coverage
- Upgrade Antd to v5
