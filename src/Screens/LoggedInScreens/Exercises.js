import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";
import ExerciseList from "../Api/ExerciseList";

export const Exercises = ({ req, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/exercises");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <LoggedInNav />
      <div className="mt-8 mb-8"></div>
      <ExerciseList />
    </div>
  );
};
