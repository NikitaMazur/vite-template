import { render, screen } from '@testing-library/react'

import LanguageProvider from 'common/language/LanguageManager'

import Loading from '../Loading'

describe('Loading component', () => {
  it('renders wrapper if isLoading === true', () => {
    render(
      <LanguageProvider>
        <Loading isLoading={false} />
      </LanguageProvider>,
    )
    expect(screen.queryAllByTestId('loading')).not.toHaveLength(0)
  })

  it('renders children if isLoading === false', () => {
    const Children = () => <div data-testid="children">children</div>
    render(
      <Loading isLoading={false}>
        <Children />
      </Loading>,
    )

    expect(screen.queryByTestId('children')).toBeTruthy()
  })
})
