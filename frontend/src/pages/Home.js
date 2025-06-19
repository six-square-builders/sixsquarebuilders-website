import React, { useEffect } from "react";
import "./Home.css";
import aboutImage from "../assets/banner1.2.jpg";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".section").forEach((section) => {
        const position = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {
          section.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once in case sections are already in view
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="image-container">
          <img src={aboutImage} alt="Six Square Builders" />
        </div>
        <div className="overlay">
          <h1>Welcome to Six Square Builders</h1>
          <p>Your trusted partner in real estate excellence</p>
          <a href="#about" className="btn-primary">
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section">
        <div className="about-content">
          <div className="eight">
            <h1>Who are we</h1>
          </div>
          <div className="TagLine">
            Trusted builders shaping futures with integrity.
          </div>
          <p>
            Founded in 2012 by Shri. Gopinathan Govindaraj and Smt. Viji
            Gopinathan, Six Square Builders is a trusted name in real estate.
            With over a decade of experience and 25+ successful projects, we are
            known for quality, integrity, and innovation that shapes
            communities.
          </p>
        </div>
        {/*   <div className="about-stats">
          <div className="stat-item">
            <div className="stat-number">25+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">70+</div>
            <div className="stat-label">Families</div>
          </div>
        </div>*/}
      </section>

      {/* Mission Section */}
      <section id="services" className="services-section section">
        <div className="eight">
          <h1>Our Mission</h1>
        </div>
        <div className="TagLine">
          Crafting every structure with passion, precision, and a promise to
          deliver more than just buildings.{" "}
        </div>
        <p>
          We commit to executing each project to the highest standards, ensuring
          timely delivery and exceptional service. By empowering our team and
          following sustainable AEC practices, we deliver quality and precision
          with passion.
        </p>
      </section>

      {/* Vision Section */}
      <section id="contact" className="contact-section section">
        <div className="eight">
          <h1>Our Vision</h1>
        </div>
        <div className="TagLine">
          Our vision is a city where everyone finds a place to belong —
          beautifully built, affordably owned.
        </div>
        <p>
          To be Chennai’s premier architectural, engineering, and construction
          company, providing high-quality, affordable homes. We strive to
          innovate, sustain, and build lasting client relationships and vibrant
          communities.
        </p>
      </section>
    </div>
  );
};

export default Home;
