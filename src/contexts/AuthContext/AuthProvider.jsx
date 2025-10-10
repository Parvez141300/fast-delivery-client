import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log('user currnet', user);
  const [loading, setLoading] = useState(false);

  // register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // user profile update
  const userProfileUpdate = (updateInfo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updateInfo);
  };
  //   login user
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }
  //   logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  //   observer for user register and login
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    userProfileUpdate,
    logIn,
    logOut,
    googleLogin,
    loading,
    setLoading,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
