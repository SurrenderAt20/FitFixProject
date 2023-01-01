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

  const handleWorkoutSelection = (workoutID) => {
    axios.get(`http://localhost:3001/api/workout/${workoutId}`).then((res) => {
      setSelectedWorkout(res.data);
    });
  };

  return (
    <div>
      <LoggedInNav />
      {workoutProgram.map((exercise) => (
        <div className="flex justify-center">
          <div className="list__item__card flex flex-row" key={exercise.id}>
            <h3>
              <b>Name:</b>
              <br />
              {exercise.name}
            </h3>
            <br />
            <button
              className="p-3 px-6 pt-2 mb-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              onClick={handleWorkoutSelection}
            >
              Open
            </button>
          </div>
        </div>
      ))}

      {selectedWorkout && (
        <div key={exercise.id}>
          {JSON.parse(selectedWorkout.exercises).map((exercise) => (
            <h3>{exercise.name}</h3>
          ))}
        </div>
      )}
    </div>
  );
};
