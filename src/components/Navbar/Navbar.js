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
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
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
                        <a href ="#universities" className="nav-links" onClick={closeMobileMenu}>
                            UNIVERSITIES
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href ="#launch" className="nav-links" onClick={closeMobileMenu}>
                            LAUNCHING SOON
                        </a>
                    </li>
                    {/* This nav-item-desktop will only appear when above 960px */}
                    <li className="nav-item-desktop">
                        <Link to ="/login" className="nav-links nav-links-desktop" onClick={closeMobileMenu}>
                            LOGIN
                        </Link>
                    </li>
                    {/* this nav-item-mobile will only appear when below 960px */}
                    <li className="nav-item-mobile">
                        <Link to ="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                            LOGIN
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
