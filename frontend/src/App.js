import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'; // Global styles
import Home from './pages/Home'; // Import Home component

const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
