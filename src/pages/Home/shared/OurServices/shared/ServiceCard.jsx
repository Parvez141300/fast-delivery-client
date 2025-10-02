import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div
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
              <div
                className={`w-2 h-2 bg-${service.color} rounded-full mr-3`}
              ></div>
              <span className="text-sm text-base-content/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
