// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UpcomingProjects from "./components/UpcomingProjects";
import CurrentProjects from "./components/CurrentProjects";
import PastProjects from "./components/PastProjects";
import AboutUs from "./components/AboutUs";
import Home from "./pages/Home";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./ScrollToTop"; // ✅ Make sure file exists
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
