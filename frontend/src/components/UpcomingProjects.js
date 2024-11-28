import React from "react";
import './UpcomingProjects.css';

const UpcomingProjects = () => {
    return (
        <div className="upcoming-project">
            <h1>Our Projects</h1>
            <p>Here are some of the projects we worked on.</p>

            <div className="upcoming-project-list">
                <div className="upcoming-project-item">
                    <h2>Project 1</h2>
                    <p>Description of Project 1</p>
                </div>
                <div className="upcoming-project-item">
                    <h2>Project 2</h2>
                    <p>Description of Project 2</p>
                </div>
            </div>
        </div>
    );
};

export default UpcomingProjects;