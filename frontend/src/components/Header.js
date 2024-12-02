import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
                    <span>Six Square Builders</span>
                    
                </div>
            </div>
            <nav>
                <ul className="nav__links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/aboutus">About Us</Link></li>
                    <li className="projects-dropdown">
                        <span>Projects</span>
                        <ul className="dropdown-menu">
                            <li><Link to="/UpcomingProjects">Upcoming Projects</Link></li>
                            <li><Link to="/CurrentProjects">Current Projects</Link></li>
                            <li><Link to="/PastProjects">Past Projects</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/ContactUs">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
