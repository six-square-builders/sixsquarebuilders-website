import React from "react";
import "./Header.css"; // Import the CSS file
import logo from "../assets/logo.png"; // Import the logo image

const Header = () => {
    return (
        <header className="header">
            {/* Logo Section */}
            <div className="logo-container">
                <img src={logo} alt="Six Square Builders Logo" className="logo" />
                <div className="company-name">
                    <span>Six Square</span>
                    <span>Builders</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul className="nav__links">
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#whatwedo">What We Do</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
