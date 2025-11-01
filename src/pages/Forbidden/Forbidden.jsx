import React from "react";
import { FaHome, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-base-300 rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-3xl text-primary" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl font-bold text-primary mb-3">
            Access Denied
          </h1>

          <p className="text-primary mb-2">
            You don't have permission to access this page.
          </p>

          <p className="text-primary text-sm mb-8">
            Please contact your administrator
            <br />
            <a
              href="mailto:parvez.alif.dev@gmail.com"
              className="hover:underline"
            >
              Contact Support
            </a>
            <br />
            if you believe this is a mistake.
          </p>

          {/* Error Code */}
          <div className="bg-base-300 rounded-lg p-4 mb-8">
            <div className="text-sm text-primary">
              Error Code: <span className="font-semibold">403 Forbidden</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="btn btn-primary btn-lg flex items-center justify-center gap-2"
            >
              <FaHome />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-lg flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-primary">
            Need help?{" "}
            <a
              href="mailto:parvez.alif.dev@gmail.com"
              className="hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
