import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success(
          `Successfully Logged in user: ${result?.user?.displayName}`
        );
        navigate(from);
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
