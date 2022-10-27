import './Navbar.styles.css'

const Navbar = () => {
  return (
    <nav id="navbar" className="navbar" data-testid="navbar">
      <h1 className="title" id="navbar-title">
        Agent Discoveries
      </h1>
      <div className="items" id="navbar-items" data-testid="navbar-items">
        <a href="/home" data-testid="navbar-item">
          Homepage
        </a>
        <a href="/about" data-testid="navbar-item">
          About
        </a>
        <a href="/profile" data-testid="navbar-item">
          Your Profile
        </a>
        <img src="/profile.png" />
      </div>
    </nav>
  )
}

export default Navbar
