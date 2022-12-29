import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const signup = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
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
        confirmPassword: confirmPassword,
      }),
    });

    const data = await response.json(); // json to ES;
    console.log(data);
    if (!response.ok) {
      dispatch({ type: "SIGNUP_ERROR", payload: data.error });
    } else {
      localStorage.setItem("copenhagen", data.token);
      dispatch({ type: "SIGNUP_SUCCESS", payload: data });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <JWT_TOKEN>",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: "LOGIN_FAILURE", payload: data.error });
      } else {
        if (data.token) {
          localStorage.setItem("copenhagen", data.token);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { token: data.token },
          });
        }
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    // Remove the JWT token from local storage
    localStorage.removeItem("jwt");

    // Clear any user data from the store
    dispatch({
      type: "LOGOUT",
    });
  };
};
