import React from "react";
import { Link, NavLink } from "react-router";
import FastDeliveryLogo from "../FastDeliveryLogo/FastDeliveryLogo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const NavBar = () => {
  const navItems = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/coverage"}
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about-us"}
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact-us"}
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar w-11/12 md:w-10/12 md:max-w-7xl mx-auto p-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <FastDeliveryLogo
          className={"btn btn-ghost px-0 hidden md:block"}
        ></FastDeliveryLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle />
        <Link to={'/login'} className="btn btn-primary btn-outline">Login</Link>
        <Link to={'/be-a-rider'} className="btn btn-primary">Be a rider</Link>
      </div>
    </div>
  );
};

export default NavBar;
