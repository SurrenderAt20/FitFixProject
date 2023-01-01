import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./YourWorkout.css";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";

export const YourWorkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workoutProgram, setWorkoutProgram] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

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

  const handleWorkoutSelection = (workoutId) => {
    axios.get(`http://localhost:3001/api/workout/${workoutId}`).then((res) => {
      setSelectedWorkout(res.data);
    });
  };

  const handleDeleteWorkout = (workoutId) => {
    // Send a DELETE request to the server to delete the workout with the given id
    axios.delete(`http://localhost:3001/api/workout/${workoutId}`).then(() => {
      // After the workout is deleted, update the list of workout programs by re-fetching the data from the server
      axios
        .get("http://localhost:3001/api/getWorkout")
        .then((res) => setWorkoutProgram(res.data))
        .catch((err) => console.error(err));
    });
  };

  return (
    <div>
      <LoggedInNav />
      <div className="flex flex-row justify-center">
        {workoutProgram.map((exercise) => (
          <div className="list__item__card" key={exercise.id}>
            <h3>
              <b>Name:</b>
              <br />
              {exercise.name}
            </h3>
            <br />
            <button
              className="p-3 px-6 pt-2 mb-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              onClick={handleWorkoutSelection(exercise.id)}
            >
              Open
            </button>
            <button
              className="p-3 px-6 pt-2 mb-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              onClick={() => handleDeleteWorkout(exercise.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedWorkout && (
        <div>
          <div className="border"></div>
          <div className="flex flex-row">
            {JSON.parse(selectedWorkout.exercises).map((exercise) => (
              <div className="list__item__card" key={exercise.id}>
                <h3>{exercise.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
