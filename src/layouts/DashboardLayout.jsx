import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import {
  FaTachometerAlt,
  FaBox,
  FaShippingFast,
  FaUser,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "../pages/components/ThemeToggle/ThemeToggle";
import FastDeliveryLogo from "../pages/components/FastDeliveryLogo/FastDeliveryLogo";
import useTheme from "../hooks/useTheme";
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const themeControl = useTheme();

  // Static navigation links
  const navigationLinks = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FaTachometerAlt className="text-lg" />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "My Parcels",
      icon: <FaBox className="text-lg" />,
      path: "/dashboard/my-parcels",
    },
    {
      id: 3,
      name: "Delivery",
      icon: <FaShippingFast className="text-lg" />,
      path: "/dashboard/delivery",
    },
    {
      id: 4,
      name: "Customers",
      icon: <FaUser className="text-lg" />,
      path: "/dashboard/customers",
    },
    {
      id: 5,
      name: "Payments",
      icon: <FaMoneyBill className="text-lg" />,
      path: "/dashboard/payment",
    },
    {
      id: 6,
      name: "Analytics",
      icon: <FaChartBar className="text-lg" />,
      path: "/dashboard/analytics",
    },
    {
      id: 7,
      name: "Settings",
      icon: <FaCog className="text-lg" />,
      path: "/dashboard/settings",
    },
    {
      id: 8,
      name: "Help & Support",
      icon: <FaQuestionCircle className="text-lg" />,
      path: "/dashboard/support",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden bg-base-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="btn btn-ghost btn-sm px-0"
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <FastDeliveryLogo />
          </div>
          <div className="flex items-center gap-2">
            {themeControl}
            <div className="avatar">
              <div className="w-8 rounded-full bg-primary text-white flex items-center justify-center">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-16"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Desktop & main content */}
      <div className="flex items-start gap-5">
        {/* sidebar */}
        <div
          className={`hidden lg:flex lg:w-64 lg:flex-col lg:inset-y-0 bg-base-200 shadow-lg ${
            isSidebarOpen ? "flex" : "hidden"
          }`}
        >
          {/* Sidebar component */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-primary text-white">
              <FastDeliveryLogo />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    link.id === 1
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span className="flex-1">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* User Profile */}
            <div className="flex-shrink-0 flex border-t border-primary p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.displayName}
                    </p>
                    <p className="text-xs font-medium text-gray-500">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col w-full px-5">
          {/* Desktop Header */}
          <header className="hidden lg:flex bg-base-200 shadow-sm">
            <div className="flex-1 flex justify-between items-center px-8 py-4">
              <div>
                <h1 className="text-xl font-bold">
                  Dashboard Overview
                </h1>
                <p>Welcome back, {user?.displayName}! 👋</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* notification with dropdown */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <FaBell size={20} />
                      <span className="badge badge-xs badge-primary indicator-item">
                        3
                      </span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <span className="font-bold text-lg">3 Notifications</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block btn-sm">
                          View all
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* theme controller */}
                {themeControl}
                {/* profile dropdown */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Profile</a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          {/* Page Content */}
          <main className="overflow-y-auto lg:py-5">
            <div className="max-w-7xl mx-auto space-y-5">
              {/* Sample content for demonstration */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="stat bg-base-300 shadow-lg rounded-lg">
                  <div className="stat-figure text-primary">
                    <FaBox className="text-3xl" />
                  </div>
                  <div className="stat-title">Total Parcels</div>
                  <div className="stat-value text-primary">1,248</div>
                  <div className="stat-desc">↗︎ 12% from last month</div>
                </div>

                <div className="stat bg-base-300 shadow-lg rounded-lg">
                  <div className="stat-figure text-secondary">
                    <FaShippingFast className="text-3xl" />
                  </div>
                  <div className="stat-title">In Transit</div>
                  <div className="stat-value text-secondary">42</div>
                  <div className="stat-desc">↗︎ 8% from yesterday</div>
                </div>

                <div className="stat bg-base-300 shadow-lg rounded-lg">
                  <div className="stat-figure text-accent">
                    <FaMoneyBill className="text-3xl" />
                  </div>
                  <div className="stat-title">Revenue</div>
                  <div className="stat-value text-accent">৳ 1.2M</div>
                  <div className="stat-desc">↗︎ 15% from last month</div>
                </div>
              </div>
              {/* This is where the page content will be rendered */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/30"
          onClick={toggleSidebar}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-base-200 shadow-lg transform transition-transform overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex flex-col">
              {/* Mobile Sidebar Header */}
              <div className="flex items-center justify-between h-16 px-4 bg-primary text-white">
                <FastDeliveryLogo />
                <button
                  onClick={toggleSidebar}
                  className="btn btn-ghost btn-sm text-white p-0 py-0 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {navigationLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.path}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      link.id === 1
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={toggleSidebar}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span className="flex-1">{link.name}</span>
                    {link.badge && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>

              {/* Mobile User Profile */}
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="avatar">
                    <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.displayName}
                    </p>
                    <p className="text-xs font-medium text-gray-500">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
