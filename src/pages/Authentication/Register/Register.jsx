import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="bg-base-100 md:max-w-md lg:max-w-lg shadow-2xl">
      <h1 className="text-center text-3xl font-bold">Register Now!</h1>
      <div className="card-body">
        <fieldset className="fieldset">
          {/* User Image field */}
          <label className="label">User Image</label>
          <input
            type="file"
            className="input w-full focus-within:outline-0"
            placeholder="image"
          />
          {/* name field */}
          <label className="label">User Name</label>
          <span className="input validator w-full focus-within:outline-0">
            <FaRegUserCircle size={20} />
            <input type="text" placeholder="Name" />
          </span>
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
          {/* confirm password field */}
          <label className="label">Confirm Password</label>
          <span className="input validator w-full focus-within:outline-0">
            <MdLockOutline size={20} />
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Password" />
            {showConfirmPassword ? (
              <button
                onClick={() => setShowConfirmPassword(false)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEye size={20} />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmPassword(true)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEyeSlash size={20} />
              </button>
            )}
          </span>
          <div className="flex items-center gap-1">
            Already Have An Account?
            <Link to={"/login"} className="link link-hover">
              Login
            </Link>
          </div>
          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
      </div>
    </div>
  );
};

export default Register;
