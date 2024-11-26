import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
    const [scrollingUp, setScrollingUp] = useState(true); // Initially visible
    const [lastScrollY, setLastScrollY] = useState(window.scrollY); // Set to current scroll position

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setScrollingUp(false); // Scrolling down, hide header
        } else {
            setScrollingUp(true); // Scrolling up, show header
        }
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <header className={`header ${scrollingUp ? 'show' : 'hide'}`}>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <div className="company-name">
                    <span>Six Square</span>
                    <span>Builders</span>
                </div>
            </div>
            <nav>
                <ul className="nav__links">
                    <li><a href="/">Home</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
