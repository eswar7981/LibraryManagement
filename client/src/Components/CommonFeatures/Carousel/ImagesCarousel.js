import React from "react";
import image1 from "../CarouselAssets/bg1.png";
import image2 from "../CarouselAssets/bg2.png";
import image3 from "../CarouselAssets/bg3.png";
import image4 from "../CarouselAssets/bg4.png";
import Carousel from "react-material-ui-carousel";

const images = [image1, image2, image3, image4];

const ImagesCarousel = () => {
  return (
    <div>
      <Carousel>
        {images.map((img) => (
          <img width="100%" height="600vh" src={img}></img>
        ))}
      </Carousel>
    </div>
  );
};

export default ImagesCarousel;
