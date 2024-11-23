import React, { useState, useEffect } from "react";
import './App.css';
import bannerImage from './assets/banner1.jpg'; // Image 1
import secondImage from './assets/banner1.1.jpg'; // Image 2
import thirdImage from './assets/banner2.jpg'; // Image 3

import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer

const App = () => {
  const images = [bannerImage, secondImage, thirdImage]; // Array of images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up interval
  }, [images.length]);

  return (
    <div className="page-container">
      {/* Header */}
      <Header />

      {/* Carousel */}
      <div className="carousel">
        <div className="carousel-list" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {/* Add the images as slides */}
          {images.map((image, index) => (
            <div key={index} className={`slide ${index === currentImageIndex ? 'show' : ''}`}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        {/* Optional gradient overlay */}
        <div className="carousel-gradient"></div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
