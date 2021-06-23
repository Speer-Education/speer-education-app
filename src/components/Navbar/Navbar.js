import React, { useState } from 'react';
// import SpeerLogo from '../images/speer-logo.png'; <-- This file is not actually transparent, used the image from the 123 instead.
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const [click, setClick] = useState(false);

    function handleClick () {
        setClick(prevClick => !prevClick)
    }

    function closeMobileMenu () {
        setClick(false);
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    {/*Image taken from the 123 website CDN -->*/ }
                    <Link to="/" onClick={closeMobileMenu}><img className="navbar-logo__image" src="./rocket-logo@2x.png" alt="speer logo"></img></Link>
                </div> {/*Link replaces the A tag once we ihave multiple pages and install React Router Dom*/}
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <a href ="#intro" className="nav-links" onClick={closeMobileMenu}>
                            HOME
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href ="#about" className="nav-links" onClick={closeMobileMenu}>
                            ABOUT
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href ="#team" className="nav-links" onClick={closeMobileMenu}>
                            TEAM
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href ="#universities" className="nav-links" onClick={closeMobileMenu}>
                            UNIVERSITIES
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href ="#launch" className="nav-links" onClick={closeMobileMenu}>
                            LAUNCHING SOON
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
