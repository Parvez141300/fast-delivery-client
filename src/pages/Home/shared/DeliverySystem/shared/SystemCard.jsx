import React from "react";

const SystemCard = ({system}) => {
  return (
    <div
      className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="card-body text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary rounded-full text-base-100">
            {system.icon}
          </div>
        </div>

        <h3 className="card-title text-lg font-bold justify-center mb-3">
          {system.title}
        </h3>

        <p className="text-base-content/70 mb-6">{system.description}</p>
      </div>
    </div>
  );
};

export default SystemCard;
