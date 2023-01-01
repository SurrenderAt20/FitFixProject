import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";

export const YourWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workoutProgram, setWorkoutProgram] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/yourworkout");
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getWorkout")
      .then((res) => setWorkoutProgram(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-row">
      <LoggedInNav />
      {workoutProgram.map((exercise) => (
        <div className="list__item__card" key={exercise.id}>
          <h3>
            <b>Name:</b>
            <br />
            {exercise.name}
          </h3>
          <h4>
            <b>Muscle Group:</b>
            <br />
            {exercise.muscle_category}
          </h4>
        </div>
      ))}
    </div>
  );
};
