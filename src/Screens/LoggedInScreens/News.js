import React from "react";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const News = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/news");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div>
      <LoggedInNav />
      <div className="mt-8 mb-8"></div>
      <div>
        <h2 className="text-center">News</h2>
      </div>
    </div>
  );
};
