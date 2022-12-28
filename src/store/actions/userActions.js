import React from "react";

export const signup = (firstname, lastname, email, password) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });

    const data = await response.json(); // json to ES;
    console.log(data);
    if (!response.ok) {
      dispatch({ type: "SIGNUP_ERROR", payload: data.error });
    } else {
      dispatch({ type: "SIGNUP_SUCCESS", payload: data });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      dispatch({ type: "LOGIN_ERROR", payload: data.error });
    } else {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    }
  };
};
