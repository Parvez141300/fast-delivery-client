import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-base-100 md:max-w-md lg:max-w-lg shadow-2xl">
      <h1 className="text-center text-xl font-bold">Login Now!</h1>
      <div className="card-body">
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">User Email</label>
          <span className="input validator w-full focus-within:outline-0">
            <MdOutlineEmail size={20} />
            <input type="email" placeholder="Email" />
          </span>
          {/* password field */}
          <label className="label">User Password</label>
          <span className="relative input validator w-full focus-within:outline-0">
            <MdLockOutline size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            {showPassword ? (
              <button
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEye size={20} />
              </button>
            ) : (
              <button
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEyeSlash size={20} />
              </button>
            )}
          </span>
          <div className="flex items-center gap-1">
            Don't Have An Account?
            <Link to={"/register"} className="link link-hover">
              Register
            </Link>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
