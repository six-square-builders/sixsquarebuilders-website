import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaGlobe,
  FaEnvelope,
  FaIdCard,
  FaFileInvoice,
} from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <h1 className="main-heading">Get in Touch</h1>
      <p className="main-subtext">
        We'd love to hear from you. Here's how you can reach us.
      </p>

      <div className="contact-container">
        {/* Left: Contact Details */}
        <div className="contact-details">
          <div className="detail-box">
            <FaPhoneAlt className="icon" />
            <span>8015407730</span>
          </div>

          <div className="detail-box">
            <FaWhatsapp className="icon" />
            <span>9884889308</span>
          </div>

          <div className="detail-box">
            <FaGlobe className="icon" />
            <a
              href="http://www.sixsquarebuilders.co.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.sixsquarebuilders.co.in
            </a>
          </div>

          <div className="detail-box">
            <FaEnvelope className="icon" />
            <a href="mailto:ssbuilders2012@yahoo.com">
              ssbuilders2012@yahoo.com
            </a>
          </div>

          <div className="detail-box">
            <FaIdCard className="icon" />
            <span>PAN: ACPFS5219L</span>
          </div>

          <div className="detail-box">
            <FaFileInvoice className="icon" />
            <span>GST: 33ACPFS5219L1ZO</span>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-form">
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
