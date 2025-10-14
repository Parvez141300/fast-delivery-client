import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen max-h-screen flex justify-center items-center">
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-xl"></span>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
