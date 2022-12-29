import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Remove the JWT token from local storage
  localStorage.removeItem("jwt");

  // Dispatch the LOGOUT action
  dispatch({ type: "LOGOUT" });

  // Navigate to the login page
  navigate("/");
}
