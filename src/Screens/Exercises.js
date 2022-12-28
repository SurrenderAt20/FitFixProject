import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Exercises = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid JWT
    const token = getJWTFromCookieOrLocalStorage();
    if (!token) {
      navigate("/getstarted");
    }
  });

  return <div>exercises - this site is only for logged in users!</div>;
};
