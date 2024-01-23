import React, { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import UserContexta from "../../context/Usercontext.js";

const ProtectedRoutes = ({ component }) => {
  //navigate user
  const navigate = useNavigate();

  //state
  const { isUser, setIsUser } = UserContexta();
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      setIsUser(true);
    });
  }, []);
  return isUser ? component : <h1 color="initial">Loading...</h1>;
};

export default ProtectedRoutes;
