import React from "react";
import './UpcomingProjects.css';

const UpcomingProjects = () => {
    return (
        <div className="projects">
            <h1>Our Projects</h1>
            <p>Here are some of the projects we worked on.</p>

            <div className="project-list">
                <div className="project-item">
                    <h2>Project 1</h2>
                    <p>Description of Project 1</p>
                </div>
                <div className="project-item">
                    <h2>Project 2</h2>
                    <p>Description of Project 2</p>
                </div>
            </div>
        </div>
    );
};

export default UpcomingProjects;