import React from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/shared/NavBar.jsx/NavBar";
import Footer from "../pages/shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      {/* navbar */}
      <nav className="bg-base-100 shadow-sm">
        <NavBar></NavBar>
      </nav>
      {/* for routing purpose */}
      <main className="w-10/12 mx-auto my-8 min-h-[calc(100vh-64px)]">
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
