import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { store } from 'init'

import CheckAccess, { CheckAccessProps } from '../CheckAccess'
import { F_PROTECTED, F_UNAUTHORISED } from '../access'

const reduxStore = store({ session: { data: { token: 'token' } } })

function renderCheckAccess(
  access?: CheckAccessProps['access'],
  accessRule: CheckAccessProps['accessRule'] = 'some',
  fallback = 'Public Data',
  children = 'Protected Data',
) {
  return render(
    <Provider store={reduxStore}>
      <CheckAccess access={access} fallback={fallback} accessRule={accessRule}>
        {children}
      </CheckAccess>
    </Provider>,
  )
}

describe('CheckAccess component', () => {
  it('CheckAccess should show children', () => {
    const { getByText } = renderCheckAccess(F_PROTECTED)

    expect(getByText('Protected Data').innerHTML).toBe('Protected Data')
  })

  it('CheckAccess should show fallback', () => {
    const { getByText } = renderCheckAccess(F_UNAUTHORISED)

    expect(getByText('Public Data').innerHTML).toBe('Public Data')
  })

  it('CheckAccess should show children if both flags provided', () => {
    const { getByText } = renderCheckAccess([F_UNAUTHORISED, F_PROTECTED])

    expect(getByText('Protected Data').innerHTML).toBe('Protected Data')
  })

  it('CheckAccess should show fallback if some flag doesn`t exist', () => {
    const { getByText } = renderCheckAccess([F_UNAUTHORISED, F_PROTECTED], 'every')

    expect(getByText('Public Data').innerHTML).toBe('Public Data')
  })

  it('CheckAccess should render children if no access provided', () => {
    const { getByText } = renderCheckAccess()

    expect(getByText('Protected Data').innerHTML).toBe('Protected Data')
  })
})
