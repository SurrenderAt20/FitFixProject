import React from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to the login page
  navigate("/");
}
