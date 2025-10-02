import React from "react";
import Marquee from "react-fast-marquee";
import brand1 from "../../../../assets/brands/amazon.png";
import brand2 from "../../../../assets/brands/amazon_vector.png";
import brand3 from "../../../../assets/brands/casio.png";
import brand4 from "../../../../assets/brands/moonstar.png";
import brand5 from "../../../../assets/brands/randstad.png";
import brand6 from "../../../../assets/brands/start-people 1.png";
import brand7 from "../../../../assets/brands/start.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brands = () => {
  return (
    <div className="space-y-5">
      <h3 className="text-xl text-center font-bold">
        We've helped thousands of sales teams
      </h3>
      <Marquee autoFill={true} pauseOnHover={true}>
        <div className="flex items-center justify-center gap-32 bg-base-200 py-2">
          {brands.map((brand, index) => (
            <img key={index} src={brand} alt={`brand-${index}`} className="h-8 object-contain" />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Brands;
