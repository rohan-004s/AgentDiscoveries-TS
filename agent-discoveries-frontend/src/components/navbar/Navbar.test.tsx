import NavBar from './Navbar'
import { cleanup, render, screen } from '@testing-library/react'

afterEach(() => {
    cleanup()
})

describe('NavBar', () => {
  it('Matches the snapshot', () => {
    const navbar = render(<NavBar />)
    expect(navbar.asFragment()).toMatchSnapshot()
  })

  it('Must render on page', () => {
    render(<NavBar />)
    const navbar = screen.getByTestId('nav-bar')
    expect(navbar).toBeInTheDocument()
  })

  test('Renders with all items', () => {
    render(<NavBar />)
    const navbarItems = screen.getAllByTestId('navbar-item')
    expect(navbarItems).toHaveLength(3)
  })
})
