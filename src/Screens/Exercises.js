import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Exercises = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has a valid JWT
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/getstarted");
      return;
    }

    // Send a request to the '/verify' route to check whether the user is still logged in
    axios
      .post(
        "http://localhost:3001/verify",
        {},
        { headers: { authorization: token } }
      )
      .then((response) => {
        // If the user is still logged in, update the JWT in local storage
        localStorage.setItem("jwt", response.data.token);
      })
      .catch((error) => {
        // If the user is not logged in, navigate to the '/getstarted' page
        navigate("/getstarted");
      });
  }, []);

  return <div>exercises - this site is only for logged in users!</div>;
};
