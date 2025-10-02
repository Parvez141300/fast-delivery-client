import React from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { Link } from "react-router";

const FastDeliveryLogo = ({ className = "" }) => {
  return (
    <Link to={"/"} className={`flex items-center ${className} hidden md:block`}>
      <h2 className="font-bold text-xl flex items-center">Fast 
      <MdOutlineDeliveryDining size={25} /> Delivery</h2>
    </Link>
  );
};

export default FastDeliveryLogo;
