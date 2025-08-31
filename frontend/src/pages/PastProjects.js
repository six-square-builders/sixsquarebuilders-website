import React, { useState, useEffect, useRef, useMemo } from "react";
import "./PastProjects.css";
import project1 from "../assets/banner1.1.jpg";
import project2 from "../assets/banner1.2.jpg";

const PastProjects = () => {
  const projectRefs = useRef([]);
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [showContent, setShowContent] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const projects = useMemo(
    () => [
      {
        title: "Balaiah Garden Madipakkam",
        image: project2,
        description:
          "A modern residential development located in Madipakkam with elegant architecture and green spaces.",
        more: [
          "3/4 BHK luxury layouts",
          "Rooftop infinity garden & pool",
          "Smart home automation throughout",
          "Italian marble flooring",
          "Dedicated fitness & yoga studio"
        ],
      },
      {
        title: "Sadashiv Nagar",
        image: project1,
        description:
          "Premium housing project situated in Sadashiv Nagar with smart infrastructure and community amenities.",
        more: [
          "Expansive open-plan living areas",
          "Modern clubhouse & lounge",
          "Serene landscaped walkways",
          "Private high-speed elevators",
          "Concierge and 24x7 security"
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const currentRefs = projectRefs.current;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = currentRefs.indexOf(entry.target);
            setVisibleProjects((prev) => (prev.includes(index) ? prev : [...prev, index]));
            setTimeout(() => {
              setShowContent((prev) => (prev.includes(index) ? prev : [...prev, index]));
            }, 800);
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
            A look back at the spaces we've transformed into homes, communities, and landmarks.
          </div>
        </div>
      </section>
      <ul className="cards">
        {projects.map((project, index) => (
          <li
            className={`cards__item ${visibleProjects.includes(index) ? "visible" : ""}`}
            key={index}
            ref={el => (projectRefs.current[index] = el)}
          >
            <div
              className="card clickable-card"
              tabIndex={0}
              role="button"
              aria-label={`View more about ${project.title}`}
              onClick={() => setOpenIndex(index)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpenIndex(index)}
            >
              <div className="card__image-container">
                <div
                  className={`card__image ${visibleProjects.includes(index) ? "visible" : ""}`}
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className={`card__content ${showContent.includes(index) ? "visible" : ""}`}>
                <div
                  className="card__title"
                  style={{ color: '#000000ff', cursor: 'pointer', pointerEvents: 'none' }}
                >
                  {project.title}
                </div>
                <p className="card__text">{project.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {openIndex !== null && (
        <div className="luxury-modal-overlay" onClick={() => setOpenIndex(null)}>
          <div className="luxury-modal" onClick={e => e.stopPropagation()}>
            <button className="luxury-modal-close" onClick={() => setOpenIndex(null)} aria-label="Close">&times;</button>
            <div className="luxury-modal-imgwrap">
              <img src={projects[openIndex].image} alt={projects[openIndex].title} />
            </div>
            <div className="luxury-modal-info">
              <h2>{projects[openIndex].title}</h2>
              <p>{projects[openIndex].description}</p>
              <div className="luxury-modal-extra">
                <ul>
                  {projects[openIndex].more?.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PastProjects;
