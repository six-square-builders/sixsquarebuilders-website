// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UpcomingProjects from "./components/UpcomingProjects"; // Adjust import paths if needed
import CurrentProjects from "./components/CurrentProjects";
import PastProjects from "./components/PastProjects";
import AboutUs from "./components/AboutUs";
import Home from "./pages/Home";
import "./App.css"; // Global styles
import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/UpcomingProjects" element={<UpcomingProjects />} />
        <Route path="/CurrentProjects" element={<CurrentProjects />} />
        <Route path="/PastProjects" element={<PastProjects />} />
        <Route path="/ContactUs" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
