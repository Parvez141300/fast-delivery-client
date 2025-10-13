import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import FastDeliveryLogo from "../FastDeliveryLogo/FastDeliveryLogo";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const NavBar = () => {
  const { user, logOut, loading, setLoading } = useAuth();
  const [showDropDown, setShowDropDown] = useState(false);
  const profileMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileMenuRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropDown]);

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
      {user && (
        <li>
          <NavLink
            to={"/send-parcel"}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            Send Parcel
          </NavLink>
        </li>
      )}
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

  // logout a user
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
        {/* theme toggle light to dark or dark to light */}
        <ThemeToggle />
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : user ? (
          <>
            <div className="relative" ref={profileMenuRef}>
              {/* user profile avatar image */}
              <div
                onClick={() => setShowDropDown((prv) => !prv)}
                className="avatar cursor-pointer"
                data-tooltip-id="user-info"
                data-tooltip-content={user?.displayName}
              >
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="object-cover"
                  />
                </div>
              </div>
              {/* profile drop down sub menu */}
              {showDropDown && (
                <div className="bg-base-100 absolute -bottom-24 right-0 z-20 p-4 rounded-lg flex flex-col gap-3 shadow-lg">
                  <Link to={"/dashboard"}>Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    to={"/login"}
                    className="text-start cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Logging Out
                      </>
                    ) : (
                      <>Logout</>
                    )}
                  </button>
                </div>
              )}
            </div>
            <Tooltip id="user-info" />
          </>
        ) : (
          <Link to={"/login"} className="btn btn-primary btn-outline">
            Login
          </Link>
        )}

        <Link to={"/be-a-rider"} className="btn btn-primary">
          Be a rider
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
