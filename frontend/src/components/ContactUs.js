import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <p>Feel free to reach out to us using the details below:</p>

            <div className="contact-info">
                <h2>SIX SQUARE BUILDERS</h2>
                <p><strong>Head Office</strong></p>
                <p>No.4/370, Pillayar Koil Street, Pallavan Nagar,</p>
                <p>Jalladampet, Chennai : 600 100, Tamil Nadu, India</p>
                <p><strong>Website:</strong> <a href="http://www.sixsquarebuilders.co.in" target="_blank" rel="noopener noreferrer">www.sixsquarebuilders.co.in</a></p>
                <p><strong>E-Mail:</strong> <a href="mailto:ssbuilders2012@yahoo.com">ssbuilders2012@yahoo.com</a></p>
                <p><strong>PAN No.:</strong> ACPFS5219L</p>
                <p><strong>GST No.:</strong> 33ACPFS5219L1ZO</p>
            </div>
        </div>
    );
};

export default ContactUs;
