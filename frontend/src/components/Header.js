import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Six Square Builders Logo" className="logo" />
          </Link>
          <div className="company-info">
            <h1 className="company-name">Six Square Builders</h1>
          </div>
        </div>

        <div className="header-right">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
          </button>

          <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`}>
            <ul className="nav__links">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
              </li>
              <li className="projects-dropdown">
                <span>
                  Projects <span className="dropdown-arrow">▼</span>
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/UpcomingProjects"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Upcoming Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/CurrentProjects"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Current Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/PastProjects"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Past Projects
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/ContactUs" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
