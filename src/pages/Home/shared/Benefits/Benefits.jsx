import React from "react";
import {
  FaMapMarkerAlt,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaClock,
  FaSync,
} from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      features: [
        "Real-time tracking updates",
        "GPS-enabled location tracking",
        "Instant status notifications",
        "Complete journey visibility",
      ],
      gradient: "from-primary to-secondary",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      features: [
        "Secure handling process",
        "Damage-free guarantee",
        "Professional courier team",
        "Quality assurance check",
      ],
      gradient: "from-secondary to-primary",
    },
    {
      id: 3,
      icon: <FaHeadset className="w-8 h-8" />,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      features: [
        "Round-the-clock availability",
        "Instant query resolution",
        "Multi-language support",
        "Quick response time",
      ],
      gradient: "from-primary to-secondary",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Delivery Success Rate" },
    { number: "24/7", label: "Customer Support" },
    { number: "100%", label: "Secure Handling" },
    { number: "Real-time", label: "Tracking" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-base-100 to-base-200">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
            <FaCheckCircle className="w-4 h-4" />
            Why Choose FastDelivery
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
            Experience Peace of Mind
          </h2>
          <p>
            We go beyond just delivery. Our comprehensive benefits ensure <br />{" "}
            your packages are safe, <br />
            tracked, and supported every step of the way.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="group relative">
              <div className="relative bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-base-300 h-full">
                <div className="p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} text-white w-fit shadow-lg`}
                  >
                    {benefit.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-base-content mb-4">
                    {benefit.title}
                  </h3>

                  <p className="text-base-content/70 leading-relaxed mb-6 flex-grow">
                    {benefit.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {benefit.features.map((feature, index) => (
                      <ul key={index} className="list-disc">
                        {/* <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.gradient}`}
                        ></div> */}
                        <li className="text-sm font-medium text-base-content/80">
                          {feature}
                        </li>
                      </ul>
                    ))}
                  </div>

                  {/* Hover Indicator */}
                  <div
                    className={`mt-6 pt-4 border-t border-base-300 group-hover:border-transparent transition-colors duration-300`}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <FaSync className="w-4 h-4 group-hover:animate-spin transition-all" />
                      <span>Always Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  Ready to Experience Premium Delivery?
                </h3>
                <p>
                  Join thousands of satisfied customers who trust FastDelivery
                  for their shipping needs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn btn-primary">
                  <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                  Track Your Parcel
                </button>
                <button className="btn btn-primary btn-outline">
                  <FaHeadset className="w-5 h-5 mr-2" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
