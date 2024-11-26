import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';
import './App.css'; // Global styles
import Home from './pages/Home'; // Import Home component

const App = () => {
  return (
    <Router>
    <div className="App">
      <Header />
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                {/* Add more routes as needed */}
            </Routes>
      <Footer />
    </div></Router>
  );
};

export default App;
