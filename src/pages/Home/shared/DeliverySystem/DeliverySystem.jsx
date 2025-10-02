import React from "react";
import { Link } from "react-router";
import { FaBox, FaMoneyBillWave, FaHubspot, FaBuilding } from "react-icons/fa";
import SystemCard from "./shared/SystemCard";

const DeliverySystem = () => {
  const systems = [
    {
      id: 1,
      icon: <FaBox className="w-8 h-8" />,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 3,
      icon: <FaHubspot className="w-8 h-8" />,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 4,
      icon: <FaBuilding className="w-8 h-8" />,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time, every time.",
    },
  ];
  return (
    <section className="bg-base-100">
      <div className="container mx-auto space-y-5">
        {/* cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {systems.map((system) => (
            <SystemCard key={system.id} system={system}></SystemCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySystem;
