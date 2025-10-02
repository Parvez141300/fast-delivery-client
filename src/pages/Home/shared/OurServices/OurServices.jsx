import React from 'react';
import { Link } from 'react-router';
import { 
  FaShippingFast, 
  FaTruck, 
  FaWarehouse, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaExchangeAlt,
  FaClock,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPhone
} from 'react-icons/fa';
import ServiceCard from './shared/ServiceCard';
import StatCard from './shared/StatCard';

const OurServices = () => {
  const services = [
    {
      id: 1,
      icon: <FaShippingFast className="w-6 h-6" />,
      title: "Express & Standard Delivery",
      description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.",
      features: [
        "Express delivery in Dhaka: 4–6 hours",
        "Standard delivery: 24-72 hours",
        "Coverage in major cities"
      ],
    },
    {
      id: 2,
      icon: <FaTruck className="w-6 h-6" />,
      title: "Nationwide Delivery",
      description: "We deliver parcels nationwide with home delivery in every district.",
      features: [
        "Home delivery in every district",
        "48–72 hours delivery time",
        "Countrywide coverage"
      ],
    },
    {
      id: 3,
      icon: <FaWarehouse className="w-6 h-6" />,
      title: "Fulfillment Solution",
      description: "Customized service with comprehensive inventory management support.",
      features: [
        "Inventory management",
        "Online order processing",
        "Packaging services",
        "After sales support"
      ],
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      title: "Cash on Home Delivery",
      description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety.",
      features: [
        "100% COD available",
        "Nationwide coverage",
        "Product safety guarantee",
        "Secure payment handling"
      ],
    },
    {
      id: 5,
      icon: <FaBuilding className="w-6 h-6" />,
      title: "Corporate Service / Contract Logistics",
      description: "Customized corporate services with comprehensive logistics support.",
      features: [
        "Warehouse management",
        "Inventory management",
        "Customized solutions",
        "Corporate partnerships"
      ],
    },
    {
      id: 6,
      icon: <FaExchangeAlt className="w-6 h-6" />,
      title: "Parcel Return",
      description: "Reverse logistics facility for returns and exchanges with online merchants.",
      features: [
        "Reverse logistics",
        "Product returns",
        "Exchange facility",
        "Merchant support"
      ],
    }
  ];

  const stats = [
    { icon: <FaClock className="w-5 h-5" />, label: "Delivery Time", value: "4-72 Hours" },
    { icon: <FaMapMarkerAlt className="w-5 h-5" />, label: "Coverage", value: "Nationwide" },
    { icon: <FaShieldAlt className="w-5 h-5" />, label: "Secure Delivery", value: "100% Guaranteed" }
  ];

  return (
    <section className="bg-base-100">
      <div className="container mx-auto space-y-5">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat}></StatCard>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service}></ServiceCard>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-tl from-primary to-secondary text-primary-content p-8 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4">
              Ready to Experience FastDelivery?
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers and businesses who trust us with their deliveries across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn btn-primary">
                <FaShippingFast className="w-5 h-5 mr-2" />
                Book Delivery Now
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <FaPhone className='w-5 h-5 mr-2' /> Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;