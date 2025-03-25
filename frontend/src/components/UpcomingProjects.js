import React, { useState } from "react";
import "./UpcomingProjects.css";

const UpcomingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [];

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="past-project">
      <h1>Upcoming Projects</h1>
      <p>Here are some of the projects we are going to work on.</p>

      <div className="past-project-list">
        {projects.map((project, index) => (
          <div
            className="past-project-item"
            key={index}
            onClick={() => openModal(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="past-project-image"
            />
            <div className="past-project-content">
              <h2>{project.description}</h2>
            </div>
            <div className="past-project-location">
              <p>{project.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProject.image} alt={selectedProject.title} />
            <div className="modal-text">
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </div>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingProjects;
