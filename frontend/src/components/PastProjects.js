import React from "react";
import "./PastProjects.css";

const PastProjects = () => {
    return (
        <div className="past-project">
            <h1>Our Projects</h1>
            <p>Here are some of the projects we worked on.</p>

            <div className="past-project-list">
                <div className="past-project-item">
                    <h2>Project 1</h2>
                    <p>Description of Project 1</p>
                </div>
                <div className="past-project-item">
                    <h2>Project 2</h2>
                    <p>Description of Project 2</p>
                </div>
            </div>
        </div>
    );
};

export default PastProjects;