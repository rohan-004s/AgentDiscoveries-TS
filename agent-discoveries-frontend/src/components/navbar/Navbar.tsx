import './Navbar.styles.css'

const Navbar = (imageUrl: string) => {
  var profileUrl = '/defaultProfile.png'
  if (imageUrl !== undefined && imageUrl.length > 0) {
    profileUrl = imageUrl
  }

  return (
    <nav id="navbar" className="navbar" data-testid="navbar">
      <form id="search-agent-network">
        <input
          type="search"
          id="search"
          name="search-network"
          placeholder="Search the agent network"
        />
      </form>
      <div className="items" id="navbar-items" data-testid="navbar-items">
        <a href="/home" data-testid="navbar-item">
          Homepage
        </a>
        <a href="/about" data-testid="navbar-item">
          About
        </a>
      </div>
      <div className="profile">
        <a href="/profile" data-testid="navbar-item">
          <img src={profileUrl} />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
