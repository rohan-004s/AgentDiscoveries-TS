import './Navbar.styles.css'

interface NavArgs {
  imageUrl?: string
}

const Navbar: React.FC<NavArgs> = (props) => {
  var profileUrl = '/defaultProfile.png'
  if (props.imageUrl !== undefined && props.imageUrl.length > 0) {
    profileUrl = props.imageUrl
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
