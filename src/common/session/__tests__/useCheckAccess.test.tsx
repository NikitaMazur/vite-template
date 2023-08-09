import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import { store } from 'init'

import { CheckAccessProps } from '../CheckAccess'
import useCheckAccess from '../useCheckAccess'
import { F_PROTECTED, F_UNAUTHORISED } from '../access'

const reduxStore = store({ session: { data: { token: 'token' } } })

const CheckAccessHook = ({
  access,
  fallback,
  children,
}: {
  access: CheckAccessProps['access']
  fallback: JSX.Element
  children: JSX.Element
}) => {
  const permissions = useCheckAccess(access)
  return permissions.every(Boolean) ? children : fallback
}

function renderCheckAccess(
  access?: CheckAccessProps['access'],
  fallback = <>Public Data</>,
  children = <>Protected Data</>,
) {
  return render(
    <Provider store={reduxStore}>
      <CheckAccessHook access={access} fallback={fallback}>
        {children}
      </CheckAccessHook>
    </Provider>,
  )
}

describe('useCheckAccess component', () => {
  it('useCheckAccess should show children', () => {
    const { getByText } = renderCheckAccess(F_PROTECTED)

    expect(getByText('Protected Data').innerHTML).toBe('Protected Data')
  })

  it('useCheckAccess should show fallback', () => {
    const { getByText } = renderCheckAccess(F_UNAUTHORISED)

    expect(getByText('Public Data').innerHTML).toBe('Public Data')
  })

  it('useCheckAccess should show fallback if some flag doesn`t exist', () => {
    const { getByText } = renderCheckAccess([F_UNAUTHORISED, F_PROTECTED])

    expect(getByText('Public Data').innerHTML).toBe('Public Data')
  })

  it('useCheckAccess should render fallback if no access provided', () => {
    const { getByText } = renderCheckAccess()

    expect(getByText('Public Data').innerHTML).toBe('Public Data')
  })
})
