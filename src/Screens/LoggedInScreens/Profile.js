import React from "react";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/profile");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <LoggedInNav />
      <div className="mt-8 mb-8"></div>
      <div>Profile - this site is only for logged in users!</div>
    </div>
  );
};
