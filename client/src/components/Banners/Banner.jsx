import Carousel from "react-bootstrap/Carousel";
import React from "react";
import Classes from "./Banner.module.css";
function Banner() {
  return (
    <div>
      <Carousel className={Classes.Carousel}>
        <Carousel.Item interval={1000} className={Classes.Image_Container}>
          <img
            className="d-block w-100"
            src="https://s.tmimgcdn.com/scr/1200x750/183400/fashion-web-banners-and-google-ads-banner-social-media_183450-2-original.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500} className={Classes.Image_Container}>
          <img
            className="d-block w-100"
            src="https://adsterra.com/blog/wp-content/uploads/2021/06/how-banners-make-you-money.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className={Classes.Image_Container}>
          <img
            className="d-block w-100"
            src="https://i0.wp.com/dcassetcdn.com/design_img/3012877/441657/441657_16639555_3012877_69d35617_image.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Banner;
