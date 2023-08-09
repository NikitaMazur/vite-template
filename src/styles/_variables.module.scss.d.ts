export interface Colors {
  primary: string
  theme: string
  secondary: string
  error: string
  valid: string
  warning: string
  info: string
  text: string
  white: string
  black: string
  'blue-50': string
  'blue-100': string
  'blue-200': string
  'blue-300': string
  'blue-400': string
  'blue-500': string
  'blue-600': string
  'blue-700': string
  'blue-800': string
  'blue-900': string
  green50: string
  green100: string
  green200: string
  green300: string
  green400: string
  green500: string
  green600: string
  green700: string
  green800: string
  green900: string
  'green-50': string
  'green-100': string
  'green-200': string
  'green-300': string
  'green-400': string
  'green-500': string
  'green-600': string
  'green-700': string
  'green-800': string
  'green-900': string
  'gray-50': string
  'gray-100': string
  'gray-200': string
  'gray-300': string
  'gray-400': string
  'gray-500': string
  'gray-600': string
  'gray-700': string
  'gray-800': string
  'gray-900': string
  gray50: string
  gray100: string
  gray200: string
  gray300: string
  gray400: string
  gray500: string
  gray600: string
  gray700: string
  gray800: string
  gray900: string
  'blue-gray-50': string
  'blue-gray-100': string
  'blue-gray-200': string
  'blue-gray-300': string
  'blue-gray-400': string
  'blue-gray-500': string
  'blue-gray-600': string
  'blue-gray-700': string
  'blue-gray-800': string
  'blue-gray-900': string
  blueGray50: string
  blueGray100: string
  blueGray200: string
  blueGray300: string
  blueGray400: string
  blueGray500: string
  blueGray600: string
  blueGray700: string
  blueGray800: string
  blueGray900: string
  'blue-50': string
  'blue-100': string
  'blue-200': string
  'blue-300': string
  'blue-400': string
  'blue-500': string
  'blue-600': string
  'blue-700': string
  'blue-800': string
  'blue-900': string
  blue50: string
  blue100: string
  blue200: string
  blue300: string
  blue400: string
  blue500: string
  blue600: string
  blue700: string
  blue800: string
  blue900: string
  'yellow-50': string
  'yellow-100': string
  'yellow-200': string
  'yellow-300': string
  'yellow-400': string
  'yellow-500': string
  'yellow-600': string
  'yellow-700': string
  'yellow-800': string
  'yellow-900': string
  yellow50: string
  yellow100: string
  yellow200: string
  yellow300: string
  yellow400: string
  yellow500: string
  yellow600: string
  yellow700: string
  yellow800: string
  yellow900: string
  'red-50': string
  'red-100': string
  'red-200': string
  'red-300': string
  'red-400': string
  'red-500': string
  'red-600': string
  'red-700': string
  'red-800': string
  'red-900': string
  red50: string
  red100: string
  red200: string
  red300: string
  red400: string
  red500: string
  red600: string
  red700: string
  red800: string
  red900: string
  'purple-50': string
  'purple-100': string
  'purple-300': string
  'purple-400': string
  'purple-500': string
  'purple-700': string
  'purple-800': string
  'purple-900': string
  purple50: string
  purple100: string
  purple300: string
  purple400: string
  purple500: string
  purple700: string
  purple800: string
  purple900: string
}

export interface Variables {
  'activity-block-width': string
  'horizontal-label-width': string
}

declare module 'react' {
  interface CSSProperties {
    '--theme-button-color'?: string | number | undefined
    '--theme-main-color'?: string | number | undefined
    '--theme-primary-font'?: string | number | undefined
  }
}

export const colors: Colors
export const variables: Variables

export default { ...colors, ...variables }
