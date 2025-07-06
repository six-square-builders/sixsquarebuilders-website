import React, { useState, useEffect, useRef, useMemo } from "react";
import "./PastProjects.css";
import project1 from "../assets/banner1.1.jpg";
import project2 from "../assets/banner1.2.jpg";

const PastProjects = () => {
  const projectRefs = useRef([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showContent, setShowContent] = useState([]);

  // Memoize the projects array to prevent unnecessary recreations
  const projects = useMemo(
    () => [
      {
        title: "Balaiah Garden Madipakkam",
        image: project2,
        description:
          "A modern residential development located in Madipakkam with elegant architecture and green spaces.",
      },
      {
        title: "Sadashiv Nagar",
        image: project1,
        description:
          "Premium housing project situated in Sadashiv Nagar with smart infrastructure and community amenities.",
      },
    ],
    []
  );

  useEffect(() => {
    const currentRefs = projectRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = currentRefs.indexOf(entry.target);
            setVisibleProjects((prev) => [...prev, index]);

            // After image reveal completes, show content
            setTimeout(() => {
              setShowContent((prev) => [...prev, index]);
            }, 800); // Match this with your CSS reveal animation duration
          }
        });
      },
      { threshold: 0.1 }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [projects]);

  return (
    <>
      <section id="about" className="about-section section">
        <div className="about-content">
          <div className="eight">
            <h1>Our work</h1>
          </div>
          <div className="TagLine">
            A look back at the spaces we've transformed into homes, communities,
            and landmarks.
          </div>
        </div>
      </section>

      <ul className="cards">
        {projects.map((project, index) => (
          <li
            className={`cards__item ${
              visibleProjects.includes(index) ? "visible" : ""
            }`}
            key={index}
            ref={(el) => (projectRefs.current[index] = el)}
          >
            <div className="card">
              <div className="card__image-container">
                <div
                  className={`card__image ${
                    visibleProjects.includes(index) ? "visible" : ""
                  }`}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div
                  className={`card__image-reveal ${
                    visibleProjects.includes(index) ? "visible" : ""
                  }`}
                />
              </div>
              <div
                className={`card__content ${
                  showContent.includes(index) ? "visible" : ""
                }`}
              >
                <div className="card__title">{project.title}</div>
                <p className="card__text">{project.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PastProjects;
