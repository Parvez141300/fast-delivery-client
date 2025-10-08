import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <section className="w-11/12 md:w-auto lg:w-7xl mx-auto my-12">
      <div className=" grid grid-cols-1 md:grid-cols-2">
        <div>
          <Outlet></Outlet>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default AuthLayout;
