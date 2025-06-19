import React from "react";
import "./AboutUs.css";
import { motion } from "framer-motion";
import {
  FaAward,
  FaBuilding,
  FaHandshake,
  FaLeaf,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Dynamic Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>BUILDING TOMORROW'S CHENNAI</h1>
          <div className="hero-subtitle">
            <span>EXCELLENCE</span>
            <span className="divider">|</span>
            <span>INNOVATION</span>
            <span className="divider">|</span>
            <span>TRUST</span>
          </div>
        </motion.div>
      </section>

      {/* Company Overview */}
      <section className="overview-section">
        <div className="overview-content">
          <h2>SHAPING URBAN EXCELLENCE SINCE 2012</h2>
          <p className="overview-text">
            Six Square Builders stands as a testament to architectural
            innovation and construction excellence in Chennai. Our commitment to
            quality, sustainable development, and customer satisfaction has made
            us one of the most trusted names in the real estate sector.
          </p>
          <div className="certification-badges">
            <div className="badge">
              <FaShieldAlt />
              <span>RERA Certified</span>
            </div>
            <div className="badge">
              <FaAward />
              <span>ISO 9001:2015</span>
            </div>
            <div className="badge">
              <FaLeaf />
              <span>Green Building Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Showcase */}
      <section className="achievement-showcase">
        <div className="achievement-card">
          <span className="number">12+</span>
          <span className="label">Years of Excellence</span>
        </div>
        <div className="achievement-card">
          <span className="number">25+</span>
          <span className="label">Projects Completed</span>
        </div>
        <div className="achievement-card">
          <span className="number">500+</span>
          <span className="label">Happy Families</span>
        </div>
        <div className="achievement-card">
          <span className="number">100%</span>
          <span className="label">On-time Delivery</span>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision-section">
        <div className="mv-container">
          <div className="mv-card">
            <h3>Our Vision</h3>
            <p>
              To be Chennai's premier real estate developer, setting new
              benchmarks in architectural excellence and sustainable urban
              development.
            </p>
          </div>
          <div className="mv-card">
            <h3>Our Mission</h3>
            <p>
              To create exceptional living spaces that combine innovative
              design, superior quality, and sustainable practices while
              fostering vibrant communities.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2>OUR CORE VALUES</h2>
        <div className="values-grid">
          <div className="value-item">
            <FaBuilding className="value-icon" />
            <h4>Quality Excellence</h4>
            <p>Uncompromising standards in every project we deliver</p>
          </div>
          <div className="value-item">
            <FaHandshake className="value-icon" />
            <h4>Customer Trust</h4>
            <p>Building relationships through transparency and reliability</p>
          </div>
          <div className="value-item">
            <FaLeaf className="value-icon" />
            <h4>Sustainability</h4>
            <p>Committed to eco-friendly construction practices</p>
          </div>
          <div className="value-item">
            <FaClock className="value-icon" />
            <h4>Timely Delivery</h4>
            <p>Consistent track record of on-time project completion</p>
          </div>
        </div>
      </section>

      {/* Company Philosophy */}
      <section className="philosophy-section">
        <div className="philosophy-content">
          <h2>OUR PHILOSOPHY</h2>
          <p>
            At Six Square Builders, we believe in creating more than just
            buildings – we create lasting legacies. Our approach combines
            innovative design, sustainable practices, and unwavering commitment
            to quality, ensuring that each project we undertake enriches lives
            and transforms communities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
