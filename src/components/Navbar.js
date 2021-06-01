import React, { useState } from 'react';
// import SpeerLogo from '../images/speer-logo.png'; <-- This file is not actually transparent, used the image from the 123 instead.
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
                <a href="/" className="navbar-logo" onClick={closeMobileMenu}>
                    {/*Image taken from the 123 website CDN -->*/ }
                    <img className="navbar-logo__image" src="https://static1.s123-cdn-static-a.com/uploads/5219948/400_filter_nobg_60aa467ccdc7f.png" alt="speer logo"></img>
                </a> {/*Link replaces the A tag once we ihave multiple pages and install React Router Dom*/}
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
                    <li className="nav-item-desktop">
                        <a href ="#launch" className="nav-links nav-links-desktop" onClick={closeMobileMenu}>
                            WE'RE LAUNCHING SOON
                        </a>
                    </li>
                    <li className="nav-item-mobile">
                        <a href ="#launch" className="nav-links-mobile" onClick={closeMobileMenu}>
                            We're Launching Soon
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
