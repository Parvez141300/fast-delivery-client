import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/components/NavBar.jsx/NavBar";
import Footer from "../pages/components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="relative">
      {/* navbar */}
      <nav className="shadow-sm z-50 fixed top-0 w-full backdrop-blur-xs">
        <NavBar></NavBar>
      </nav>
      {/* for routing purpose */}
      <main className="w-11/12 md:w-10/12 md:max-w-7xl mx-auto my-8 mt-20 min-h-[calc(100vh-64px)]">
        <Outlet></Outlet>
      </main>
      {/* footer */}
      <footer className="bg-base-300">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
