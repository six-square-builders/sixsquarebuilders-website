import React, { useState } from "react";
import "./PastProjects.css";
import project1 from "../assets/banner1.1.jpg";
import project2 from "../assets/banner1.2.jpg";


const PastProjects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {

            title: "Balaiah Garden Madipakkam",
            image: project2,
            
        },
        {
            title: "Sadashiv Nagar",
            image: project1,
            description: ""
        },
    ];

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <div className="past-project">
            <h1>Our Projects</h1>
            <p>Here are some of the projects we have proudly worked on.</p>

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
                        {/* Location Name Below the Image */}
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
                        </div>
                        <button className="close-button" onClick={closeModal}>×</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PastProjects;
