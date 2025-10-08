import React from "react";
import { Outlet } from "react-router";
import LottieRegisterAndLogin from "../assets/LottieFiles/Register and Login.json";
import Lottie from "lottie-react";
import FastDeliveryLogo from "../pages/components/FastDeliveryLogo/FastDeliveryLogo";
import ThemeToggle from "../pages/components/ThemeToggle/ThemeToggle";

const AuthLayout = () => {
  return (
    <section className="w-11/12 md:w-10/12 lg:w-7xl mx-auto my-12 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex-1 space-y-8">
          <div className="flex flex-col gap-5">
            <FastDeliveryLogo />
            <ThemeToggle />
          </div>
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <Lottie animationData={LottieRegisterAndLogin} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
