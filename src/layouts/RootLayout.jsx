import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/components/NavBar.jsx/NavBar";
import Footer from "../pages/components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      {/* navbar */}
      <nav className="bg-base-200 shadow-sm">
        <NavBar></NavBar>
      </nav>
      {/* for routing purpose */}
      <main className="w-11/12 md:w-auto md:max-w-7xl mx-auto my-6 min-h-[calc(100vh-64px)]">
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
