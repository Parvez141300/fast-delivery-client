import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  // const react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log("login form data:", data);

    logIn(data.email, data.password)
      .then((userCredential) => {
        toast.success(
          `Successfully Logged in user: ${userCredential?.user?.displayName}`
        );
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="bg-base-100 md:max-w-md lg:max-w-lg shadow-2xl p-5">
      <h1 className="text-center text-xl font-bold">Login Now!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">User Email</label>
          <span className="input validator w-full focus-within:outline-0">
            <MdOutlineEmail size={20} />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </span>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {/* password field */}
          <label className="label">User Password</label>
          <span className="relative input validator w-full focus-within:outline-0">
            <MdLockOutline size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                maxLength: 10,
              })}
            />
            {showPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEye size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEyeSlash size={20} />
              </button>
            )}
          </span>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500">
              Password must be maximum 10 character long
            </p>
          )}
          <div className="flex items-center gap-1">
            Don't Have An Account?
            <Link to={"/register"} className="link link-hover">
              Register
            </Link>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
      </form>
      <div className="divider">OR</div>
      {/* Google */}
      <button className="btn bg-white text-black border-[#e5e5e5] flex justify-center items-center w-full">
        <FcGoogle size={20} />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
