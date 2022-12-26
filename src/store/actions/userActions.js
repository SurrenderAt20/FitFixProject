import { Signup } from "../../Screens/Signup";
import axios from "axios";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json(); // json to ES;
    console.log(data);
    if (!response.ok) {
      //there was an error
    } else {
      dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
    }
  };
};
