import React from "react";
import { Link } from "react-router";
import {
  FaHome,
  FaSearch,
  FaExclamationTriangle,
  FaArrowLeft,
  FaRocket,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-[1.01] transition-all duration-300">
          {/* Animated Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <FaExclamationTriangle className="text-3xl text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                <span className="text-white text-xs font-bold">404</span>
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-6">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
              Oops! The page you're looking for seems to have vanished into the
              digital void. It might have been moved, deleted, or never existed
              in the first place.
            </p>
          </div>

          {/* Fun Illustration Section */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaRocket className="text-blue-500 text-xl" />
              </div>
              <p className="text-gray-700 font-medium">
                Let's get you back on track!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="btn btn-primary btn-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
            >
              <FaHome />
              Back to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-lg flex items-center justify-center gap-3 border-2 hover:border-gray-400 transition-all duration-300 flex-1"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <FaSearch className="text-blue-600" />
              <p className="text-sm">
                Can't find what you're looking for?{" "}
                <Link
                  to="/contact-us"
                  className="font-semibold hover:underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Still lost? Here are some helpful links:
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <Link
              to="/coverage"
              className="text-primary hover:underline text-sm"
            >
              Service Coverage
            </Link>
            <Link
              to="/about-us"
              className="text-primary hover:underline text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-primary hover:underline text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
