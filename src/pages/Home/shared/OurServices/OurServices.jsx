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
    <section className="py-16 bg-base-100" id="services">
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
            <div key={index} className="card bg-base-200 shadow-lg">
              <div className="card-body text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary rounded-full text-base-100">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
                <p className="text-base-content/70 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 border-secondary`}
            >
              <div className="card-body">
                <div className="flex items-start mb-4">
                  <div className={`p-3 bg-primary rounded-xl mr-4 text-base-100`}>
                    {service.icon}
                  </div>
                  <h3 className="card-title text-xl font-bold text-base-content">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-base-content/70 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-2 h-2 bg-${service.color} rounded-full mr-3`}></div>
                      <span className="text-sm text-base-content/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-tl from-primary to-secondary text-primary-content p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
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