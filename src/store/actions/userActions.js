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
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "POST",
      });
      if (!response.ok) {
        dispatch({ type: "LOGOUT_FAILURE" });
      } else {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.message });
    }
  };
};
