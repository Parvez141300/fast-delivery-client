import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  // this function is for file open picker
  const handleAvater = () => {
    fileInputRef.current.click(); //open file picker
  };
  // set image to the state of preview and make the image format to save in the cloudinary and database
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const {name, email, password, confirmPassword} = data;
    
    console.log("register form data: ", data);
  };

  return (
    <div className="bg-base-100 md:max-w-md lg:max-w-lg shadow-2xl p-5 rounded-lg">
      <h1 className="text-center text-xl font-bold">Register Now!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* User Image field */}
          <label>User Image</label>
          {/* image input field */}
          <div
            onClick={handleAvater}
            className="avatar avatar-placeholder cursor-pointer"
          >
            <div className="bg-neutral text-neutral-content w-12 rounded-full border-2 border-primary">
              {/* image preview or icon */}
              <span>
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <FaRegUserCircle size={20} />
                )}
                {/* input field */}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="input w-full focus-within:outline-0 hidden"
                  placeholder="image"
                  accept="image/*"
                  ref={fileInputRef}
                />
              </span>
            </div>
          </div>

          {/* name field */}
          <label className="label">User Name</label>
          <span className="input validator w-full focus-within:outline-0">
            <FaRegUserCircle size={20} />
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                maxLength: 20,
              })}
            />
            <br />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="text-red-500">
                The name should be 20 character long
              </p>
            )}
          </span>
          {/* email field */}
          <label className="label">User Email</label>
          <span className="input validator w-full focus-within:outline-0">
            <MdOutlineEmail size={20} />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <br />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </span>
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
            <br />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be maximum 10 character long
              </p>
            )}
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
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Password"
              {...register("confirmPassword", { required: true })}
            />
            <br />
            {errors.confirmPassword?.type === "required" && (
              <p className="text-red-500">Confirmation password is required</p>
            )}
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
          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
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

export default Register;
