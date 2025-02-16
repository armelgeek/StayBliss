"use client";
import { useEffect, useRef, useState } from "react";

export type SliderProps = {
  images: string[];
  children?: React.ReactNode;
};

const Slider: React.FC<SliderProps> = ({ images, children }) => {
  const [active, setActive] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setActive((prevActive) => (prevActive >= images.length ? 1 : prevActive + 1));
      }, 5000);
    };

    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  function handleTranslate(index: number) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActive(index);
  }

  return (
    <div className="slider">
      <div className="slider-overlay">{children}</div>
      <div className="slideshow">
        {images.map((item, index) => (
          <div key={index} className={`slide ${active === index + 1 ? "active" : ""}`}>
            <img src={item} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <nav className="slider-menu">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleTranslate(index + 1)}
            className={active === index + 1 ? "active" : ""}
          ></button>
        ))}
      </nav>
    </div>
  );
};

export default Slider;
