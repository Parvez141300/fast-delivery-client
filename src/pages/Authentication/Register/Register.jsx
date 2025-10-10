import React, { useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../shared/SocialLogin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const { createUser, userProfileUpdate, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state.from.pathname || "/";

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
    reset,
  } = useForm();

  // register function
  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword } = data;
    // validation
    if (password !== confirmPassword) {
      return toast.error("Password didn't matched the Confirmation Password", {
        position: "top-center",
      });
    }
    if (!imageFile) {
      return toast.error("You haven't given your image");
    }

    // upload image in cloudinary and get the hosted image link
    const uploadPreset = "fast-delivery-images";
    const cloudName = "dapbx8al2";
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const imgData = await res.json();
    const imageURL = imgData.secure_url;

    if (!imageURL) {
      return toast.error("Image file didn't hosted in cloudinary");
    }

    // creating a user
    createUser(email, password)
      .then((userCredential) => {
        // update profile
        userProfileUpdate({
          ...userCredential.user,
          displayName: name,
          photoURL: imageURL,
        })
          .then(() => {
            toast.success("User Successfully Registered", {
              position: "top-center",
            });
            setLoading(false);
            reset();
            setImageFile(null);
            setImagePreview(null);
            navigate(from);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="bg-base-100 md:max-w-md lg:max-w-lg shadow-2xl p-5 rounded-lg">
      <h1 className="text-center text-xl font-bold">Register Now!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          {/* User Image field */}
          <label className="label">User Image</label>
          {/* image input field */}
          <div
            onClick={handleAvater}
            className="avatar avatar-placeholder cursor-pointer"
          >
            <div className="bg-neutral text-neutral-content w-20 rounded-full border-2 border-primary">
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
          </span>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {errors.name?.type === "maxLength" && (
            <p className="text-red-500">The name should be 20 character long</p>
          )}
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
          {/* confirm password field */}
          <label className="label">Confirm Password</label>
          <span className="input validator w-full focus-within:outline-0">
            <MdLockOutline size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Password"
              {...register("confirmPassword", { required: true })}
            />
            {showConfirmPassword ? (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(false)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEye size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(true)}
                className="absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer"
              >
                <FaRegEyeSlash size={20} />
              </button>
            )}
          </span>
          {errors.confirmPassword?.type === "required" && (
            <p className="text-red-500">Confirmation password is required</p>
          )}
          <div className="flex items-center gap-1">
            Already Have An Account?
            <Link to={"/login"} className="link link-hover">
              Login
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-4"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner"></span>
                Registering
              </>
            ) : (
              <>Register</>
            )}
          </button>
        </fieldset>
      </form>
      <div className="divider">OR</div>
      {/* Google */}
      <SocialLogin />
    </div>
  );
};

export default Register;
