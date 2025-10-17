import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaShippingFast,
  FaTimesCircle,
} from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      color: "badge-warning",
      icon: <FaClock className="mr-1" />,
      text: "Pending",
    },
    "in-transit": {
      color: "badge-info",
      icon: <FaShippingFast className="mr-1" />,
      text: "In Transit",
    },
    delivered: {
      color: "badge-success",
      icon: <FaCheckCircle className="mr-1" />,
      text: "Delivered",
    },
    cancelled: {
      color: "badge-error",
      icon: <FaTimesCircle className="mr-1" />,
      text: "Cancelled",
    },
  };
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <div
      className={`badge ${config.color} gap-1 text-white font-semibold`}
    >
      {config.icon}
      {config.text}
    </div>
  );
};

export default StatusBadge;
