import React from "react";
import { Link } from "react-router";
import { FaBox, FaMoneyBillWave, FaHubspot, FaBuilding } from "react-icons/fa";

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
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {systems.map((system) => (
            <div
              key={system.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary rounded-full text-primary-content">
                    {system.icon}
                  </div>
                </div>

                <h3 className="card-title text-lg font-bold justify-center mb-3">
                  {system.title}
                </h3>

                <p className="text-base-content/70 mb-6">
                  {system.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-primary text-primary-content p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Ship with FastDelivery?
            </h3>
            <p className="mb-6 opacity-90">
              Join thousands of satisfied customers who trust us with their
              deliveries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn btn-secondary">
                Book Now
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverySystem;
