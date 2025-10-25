import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleLogin, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const loggedUser = result.user;
        // save user data to database
        const userData = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          image: loggedUser.photoURL,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        const res = await axiosSecure.post("/users", userData);

        if (res.data.insertedId) {
          toast.success("User Successfully Registered", {
            position: "top-center",
          });
          setLoading(false);
          navigate(from);
        } else {
          if (res.data.insertedId === null) {
            navigate(from);
          }
          setLoading(false);
          toast.error("Successfully logged in", {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="btn bg-white text-black border-[#e5e5e5] flex justify-center items-center w-full"
    >
      <FcGoogle size={20} />
      {loading ? (
        <>
          <span className="loading loading-spinner"></span> Login with Google
        </>
      ) : (
        <>Login with Google</>
      )}
    </button>
  );
};

export default SocialLogin;
