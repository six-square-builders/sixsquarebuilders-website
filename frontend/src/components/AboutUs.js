import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Get to Know About Us</h1>
      </div>

      <div className="about-us-content">
        <div className="about-us-introduction">
          <h2 className="about-us-title">Who are we?</h2>
          <p className="about-us-description">
            Six Square Builders, founded in 2012 by Shri. Gopinathan Govindaraj
            and Smt. Viji Gopinathan, is a trusted name in the real estate
            sector. With over a decade of experience, the firm has consistently
            delivered exceptional projects, earning a reputation for quality,
            integrity, and innovation. Having successfully completed more than
            25 projects, they continue to shape the skyline with their
            unwavering commitment to excellence.
          </p>
        </div>
        {/*
                <div className="about-us-projects">
                    <h2 className="about-us-project-title">Project Details</h2>
                    <p className="about-us-project-description">
                        We have successfully completed over 25 standalone projects across various locations in Chennai, including Pallavaram, 
                        Oragadam, and Tambaram. In addition to these projects, we have developed and promoted two prominent projects—Ganapathy 
                        Enclave (RERA-compliant) and Ganesh Castle—comprising a total of 21 units. Our commitment to quality and attention to 
                        detail has made these developments stand out in the real estate market.
                    </p>
                </div>
                
                */}
        <div className="about-us-mission">
          <h2 className="about-us-mission-title">Mission</h2>
          <p className="about-us-mission-description">
            "At Six Square Builders, we strive to execute each project to the
            highest standards, ensuring on-time delivery and exceptional service
            for our customers. Our commitment to quality and precision drives
            every aspect of our work. We believe in fostering an amicable work
            environment for our team, empowering them to perform at their best.
            In addition, we strictly adhere to effective AEC (Architecture,
            Engineering, and Construction) practices, ensuring that each project
            is executed efficiently and sustainably. Our dedication to
            excellence reflects our passion for shaping the future of real
            estate."
          </p>
        </div>

        <div className="about-us-vision">
          <h2 className="about-us-vision-title">Vision</h2>
          <p className="about-us-vision-description">
            "Six Square Builders' vision is to emerge as a premier
            architectural, engineering, and construction company in Chennai,
            offering high-quality homes at affordable prices. We strive to be
            the preferred choice for our clients' housing needs, delivering
            exceptional value and excellence in every project. With a commitment
            to innovation, sustainability, and customer satisfaction, we aim to
            build lasting relationships and contribute to the development of
            vibrant communities."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
