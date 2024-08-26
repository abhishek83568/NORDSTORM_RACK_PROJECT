import React, { useState } from "react";
import Brands from "../assets/Brands.gif";
import Brand2 from "../assets/Brand2.webp";
import Brand3 from "../assets/Brand3.webp";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const BrandSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slideshow = [
    {
      src: Brands,
    },
    {
      src: Brand2,
    },
    {
      src: Brand3,
    },
  ];

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? slideshow.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === slideshow.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {slideshow && slideshow.length
        ? slideshow.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.src}
              alt={imageItem.id}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image  hide-current-image"
              }
            />
          ))
        : null}

      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicator">
        {slideshow && slideshow.length
          ? slideshow.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
};

export default BrandSlideshow;
