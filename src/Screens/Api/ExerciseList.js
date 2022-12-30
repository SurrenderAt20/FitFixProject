import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExerciseList() {
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    // Fetch exercise data from the API
    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        setExerciseData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty array ensures that the effect only runs once

  return (
    <ul>
      {exerciseData.map((exercise) => (
        <li key={exercise.id}>
          {exercise.name}: {exercise.description}
        </li>
      ))}
    </ul>
  );
}
