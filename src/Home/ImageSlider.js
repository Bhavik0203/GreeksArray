import React, { useState } from 'react';

// Add your images here
const images = [banner1, banner2, banner3]; // Replace with your image paths

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex justify-center items-center" style={{ width: '600px', height: '600px' }}>
      <button onClick={prevSlide} className="absolute left-0 ml-2 text-2xl">
        ❮
      </button>
      <img
        src={images[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="object-cover w-full h-full"
      />
      <button onClick={nextSlide} className="absolute right-0 mr-2 text-2xl">
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
