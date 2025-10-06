import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// banner imported images
import image1 from "../../../../assets/banner-images/image1.jpg";
import image2 from "../../../../assets/banner-images/image2.jpg";
import image3 from "../../../../assets/banner-images/image3.jpg";

const bannerImages = [image1, image2, image3];

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="min-h-[30vh] md:min-h-[50vh] rounded-lg"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`image-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Banner;
