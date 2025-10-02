import React from "react";

const StatCard = ({stat}) => {
  return (
    <div className="card bg-base-200 shadow-lg">
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
  );
};

export default StatCard;
