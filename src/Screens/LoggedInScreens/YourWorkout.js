import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";

export const YourWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/yourworkout");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <LoggedInNav />
      <div>Your Workout</div>
    </div>
  );
};
