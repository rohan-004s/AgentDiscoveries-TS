import React from "react"
import "./Navbar.styles.scss"

const Navbar: React.FC = () => {

    return (
        <>
            <nav id="navbar" className="navbar" data-testid="nav-bar">
                <h1 className="title" id="navbar-title">Agent Discoveries</h1>
                <div className="items" id="navbar-items" data-testid="navbar-items">
                    <a href="/home" data-testid="navbar-item">Homepage</a>
                    <a href="/about" data-testid="navbar-item">About</a>
                    <a href="/profile" data-testid="navbar-item">Your Profile</a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;