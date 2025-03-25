import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Company Information</h2>
            </li>
            <li className="footer-nav-item-item">
              <Link to="/aboutus" className="footer-nav-link">
                About
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="ContactUs" className="footer-nav-link">
                Contact
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Projects</h2>
            </li>
            <li className="footer-nav-item">
              <Link to="/UpcomingProjects" className="footer-nav-link">
                Upcoming Projects
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/CurrentProjects" className="footer-nav-link">
                Current Projects
              </Link>
            </li>
            <li className="footer-nav-item">
              <Link to="/PastProjects" className="footer-nav-link">
                Completed Projects
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">General</h2>
            </li>
            <li className="footer-nav-item">
              <Link to="/" className="footer-nav-link">
                Home
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Contact</h2>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>
              <a href="tel:+607936-8058" className="footer-nav-link">
                (+91) 8015407730
              </a>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <a href="mailto:example@gmail.com" className="footer-nav-link">
                ssbuilders2012@yahoo.com
              </a>
            </li>
          </ul>

          <ul className="footer-nav-list"></ul>
        </div>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/share/16R6hLSYWB/"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"></path>
            </svg>
          </a>

          <a
            href="https://www.instagram.com/gopinathangovindaraj?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="instagram"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M22.406 11.034c.795 0 1.44-.645 1.44-1.44 0-.795-.645-1.44-1.44-1.44-.795 0-1.44.645-1.44 1.44 0 .795.645 1.44 1.44 1.44zM16 9.838c-1.219 0-2.41.361-3.424 1.038-1.013.677-1.803 1.64-2.27 2.766-.466 1.126-.588 2.365-.35 3.56.238 1.195.825 2.293 1.687 3.155.861.862 1.96 1.449 3.155 1.687 1.195.238 2.434.116 3.56-.35 1.126-.467 2.088-1.257 2.766-2.27.677-1.014 1.038-2.205 1.038-3.424 0-1.634-.65-3.202-1.805-4.357-1.155-1.156-2.723-1.805-4.357-1.805zM16 20c-.791 0-1.565-.235-2.222-.674-.658-.44-1.17-1.064-1.473-1.795-.303-.731-.383-1.535-.228-2.311.154-.776.535-1.489 1.095-2.048.559-.56 1.272-.94 2.048-1.095.775-.155 1.58-.075 2.31.228.732.302 1.356.815 1.796 1.473.44.657.674 1.43.674 2.222 0 1.06-.422 2.078-1.172 2.828S17.061 20 16 20z"></path>
              <path d="M16 6.162c3.204 0 3.584.012 4.849.07.761.01 1.515.149 2.228.413.518.2.988.506 1.38.898.392.392.698.862.898 1.38.264.713.404 1.467.413 2.228.058 1.265.07 1.645.07 4.85 0 3.203-.012 3.583-.07 4.848-.01.761-.149 1.515-.413 2.228-.2.518-.506.988-.898 1.38-.392.392-.862.698-1.38.898-.713.264-1.467.404-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-.761-.01-1.515-.149-2.228-.413-.518-.2-.988-.506-1.38-.898-.392-.392-.698-.862-.898-1.38-.264-.713-.404-1.467-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.01-.76.149-1.515.413-2.228.2-.518.506-.988.898-1.38.392-.392.862-.698 1.38-.898.713-.264 1.467-.404 2.228-.413 1.265-.058 1.645-.07 4.849-.07zM16 4c-3.259 0-3.668.014-4.948.072-.995.02-1.98.209-2.912.558-.797.308-1.521.78-2.126 1.384C5.41 6.62 4.938 7.343 4.63 8.14c-.35.932-.538 1.917-.558 2.913C4.014 12.333 4 12.74 4 16c0 3.259.014 3.668.072 4.948.02.995.209 1.98.558 2.912.308.798.78 1.522 1.384 2.126.605.605 1.329 1.076 2.126 1.384.932.35 1.917.538 2.913.558 1.28.058 1.688.072 4.947.072 3.259 0 3.668-.014 4.948-.072.995-.02 1.98-.209 2.912-.558.798-.308 1.522-.78 2.126-1.384.605-.605 1.076-1.329 1.384-2.126.35-.933.538-1.917.558-2.913.058-1.28.072-1.688.072-4.947 0-3.259-.014-3.668-.072-4.948-.02-.995-.209-1.98-.558-2.912-.308-.797-.78-1.521-1.384-2.125-.605-.605-1.329-1.076-2.126-1.385-.933-.349-1.917-.537-2.913-.557C19.667 4.013 19.26 4 16 4z"></path>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/six-square-builders/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <svg
              width="31"
              height="31"
              fill="none"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M26.21 4H5.79c-.465-.003-.913.177-1.248.5-.334.323-.529.765-.542 1.23V26.2c.01.466.204.909.54 1.233.335.324.784.502 1.25.497h20.42c.466.005.915-.173 1.25-.497.336-.324.53-.767.54-1.233V5.73c-.013-.465-.208-.907-.542-1.23-.335-.323-.783-.503-1.248-.5zm-15.1 20.41H7.59V13h3.52v11.41zm-1.72-13c-.54 0-1.06-.211-1.446-.588-.387-.378-.61-.892-.624-1.432-.01-.274.037-.548.138-.804.1-.255.252-.487.447-.681.194-.195.426-.347.681-.447.256-.1.53-.148.804-.138.523.036 1.012.27 1.37.653.357.383.556.888.556 1.412 0 .524-.199 1.029-.556 1.412-.358.383-.847.617-1.37.653v-.04zm15.09 12.93H21v-5.58c0-1.33 0-3.06-1.86-3.06S17 17.16 17 18.63v5.65h-3.56V13h3.32v1.5h.07c.34-.591.837-1.077 1.434-1.405.598-.328 1.275-.486 1.956-.455 3.59 0 4.26 2.4 4.26 5.45v6.25z"></path>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/six-square-builders/"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            <svg
              width="23"
              height="23"
              fill="none"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M 19.042969 13.542969 L 30.957031 0 L 28.132812 0 L 17.789062 11.757812 L 9.527344 0 L 0 0 L 12.492188 17.78125 L 0 31.984375 L 2.824219 31.984375 L 13.746094 19.566406 L 22.472656 31.984375 L 32 31.984375 Z M 15.175781 17.9375 L 13.910156 16.167969 L 3.839844 2.078125 L 8.175781 2.078125 L 16.304688 13.449219 L 17.570312 15.21875 L 28.136719 30 L 23.800781 30 Z M 15.175781 17.9375 "></path>
            </svg>
          </a>
        </div>

        <div class="footer-copyright">
          <p>
            &copy; 2025 Six Square Builders. All Rights Reserved. | Designed by
            Harmesh G V.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
