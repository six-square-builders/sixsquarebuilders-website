import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetPath, event) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    
    if (location.pathname === targetPath) {
      // If already on the same page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to the new page
      navigate(targetPath);
    }
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo-container">
          <a href="/" onClick={(e) => handleNavClick('/', e)}>
            <img src={logo} alt="Six Square Builders Logo" className="logo" />
          </a>
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
                <a href="/" onClick={(e) => handleNavClick('/', e)}>
                  Home
                </a>
              </li>
              <li>
                <a href="/aboutus" onClick={(e) => handleNavClick('/aboutus', e)}>
                  About Us
                </a>
              </li>
              <li className="projects-dropdown">
                <span className="nav-link-dropdown">
                  Projects 
                  { " "}<FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      href="/UpcomingProjects"
                      onClick={(e) => handleNavClick('/UpcomingProjects', e)}
                    >
                      Upcoming Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/CurrentProjects"
                      onClick={(e) => handleNavClick('/CurrentProjects', e)}
                    >
                      Current Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="/PastProjects"
                      onClick={(e) => handleNavClick('/PastProjects', e)}
                    >
                      Past Projects
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/ContactUs" onClick={(e) => handleNavClick('/ContactUs', e)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;