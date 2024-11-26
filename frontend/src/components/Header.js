import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [scrollingUp, setScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Detect scroll direction
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollingUp(false); // Scrolling down
    } else {
      setScrollingUp(true); // Scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${scrollingUp ? 'show' : 'hide'}`}>
      <div className="logo-container">
        <img src={logo} alt="Six Square Builders Logo" className="logo" />
        <div className="company-name">
          <span>Six Square</span>
          <span>Builders</span>
        </div>
      </div>

      <nav>
        <ul className="nav__links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
