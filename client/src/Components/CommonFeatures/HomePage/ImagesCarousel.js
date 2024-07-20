import React from "react";
import image1 from "./HomePageAssets/bg1.png";
import image2 from "./HomePageAssets/bg2.png";
import image3 from "./HomePageAssets/bg3.png";
import image4 from "./HomePageAssets/bg4.png";
import Carousel from "react-material-ui-carousel";

const images = [image1, image2, image3, image4];

const ImagesCarousel = () => {
  return (
    <div>
      <Carousel >
        {images.map((img) => (
          <img width='100%' height='600vh' src={img}></img>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesCarousel;
