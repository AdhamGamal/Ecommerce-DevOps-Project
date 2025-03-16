import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useAuthenticate = () => {
  const { token, user, isLogged } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const isAuthenticated = !!token;

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role) {
      // Set individual states based on the role
      setIsAdmin(role === "admin");
    }
  }, [user, location]);

  return {
    isAuthenticated,
    token,
    user,
    isLogged,
    isAdmin,
  };
};

export default useAuthenticate;
