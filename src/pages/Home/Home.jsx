import React from "react";
import Banner from "./shared/Banner/Banner";
import DeliverySystem from "./shared/DeliverySystem/DeliverySystem";
import OurServices from "./shared/OurServices/OurServices";
import Brands from "./shared/Brands/Brands";
import Benefits from "./shared/Benefits/Benefits";
import TestimonialSlider from "./shared/TestimonialSlider/TestimonialSlider";
import FAQ from "./shared/FAQ/FAQ";

const Home = () => {
  return (
    <div className="space-y-12 md:max-w-7xl mx-auto">
      {/* banner */}
      <Banner></Banner>
      {/* delivery systems */}
      <DeliverySystem></DeliverySystem>
      {/* our services */}
      <OurServices></OurServices>
      {/* brands */}
      <Brands></Brands>
      {/* benefits */}
      <Benefits></Benefits>
      {/* testimonial slider */}
      <TestimonialSlider></TestimonialSlider>
      {/* faq section */}
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
