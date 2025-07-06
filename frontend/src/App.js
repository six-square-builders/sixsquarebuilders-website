// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UpcomingProjects from "./pages/UpcomingProjects";
import CurrentProjects from "./pages/CurrentProjects";
import PastProjects from "./pages/PastProjects";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToDown"; 
import "./App.css";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/UpcomingProjects" element={<UpcomingProjects />} />
            <Route path="/CurrentProjects" element={<CurrentProjects />} />
            <Route path="/PastProjects" element={<PastProjects />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;