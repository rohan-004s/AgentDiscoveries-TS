import Navbar from './Navbar'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
})

describe('Navbar', () => {
  it('Matches the snapshot', () => {
    const navbar = render(<Navbar />)
    expect(navbar.asFragment()).toMatchSnapshot()
  })

  it('Must render on page', () => {
    render(<Navbar />)
    const navbar = screen.getByTestId('navbar')
    expect(navbar).toBeInTheDocument()
  })

  test('Renders with all items', () => {
    render(<Navbar />)
    const navbarItems = screen.getAllByTestId('navbar-item')
    expect(navbarItems).toHaveLength(3)
  })
})
