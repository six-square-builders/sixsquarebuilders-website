import React from "react";
import "./Home.css"; // Styles specific to the Home page
import aboutImage from "../assets/banner1.2.jpg"; // Image file

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div id="home" className="hero-section">
        {/* Image on the left */}
        <div className="image-container">
          <img src={aboutImage} alt="Six Square Builders" />
        </div>

        {/* Overlay on the right */}
        <div className="overlay">
          <h2>Welcome to Six Square Builders</h2>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about-section">
        <h2>About Six Square Builders</h2>
        <p>
          We execute projects with exceptional quality, ensuring value and
          leveraging modern techniques to meet emerging challenges.
        </p>
      </div>

      {/* Services Section */}
      <div id="services" className="services-section">
        <h2>Our Services</h2>
        <p>We offer a wide range of services, including construction, renovation, and project management.</p>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or inquiries, feel free to reach out to us!</p>
      </div>
    </div>
  );
};

export default Home;
