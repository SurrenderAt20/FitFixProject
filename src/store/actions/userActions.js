import axios from "axios";
import { first } from "rxjs";

axios.defaults.withCredentials = true;
export const signup = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      const data = response.data;
      dispatch({ type: "SIGNUP_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "SIGNUP_ERROR", payload: error.message });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });

      const data = response.data;
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/logout");
      dispatch({ type: "LOGOUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.message });
    }
  };
};

export const updateProfile = (firstname, lastname, email, password) => {
  return async (dispatch) => {
    dispatch({ type: "UPDATE_REQUEST" });
    try {
      const response = await axios.post(
        "http://localhost:3001/api/updateProfile",
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }
      );

      const data = response.data;
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE", payload: error.message });
    }
  };
};
