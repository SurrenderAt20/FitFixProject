import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup, login } from "../store/actions/userActions";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

export const Signup = () => {
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [formType, setFormType] = useState("signup");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setUserInput((prevState) => {
      const inputValue = event.target.value;
      const inputName = event.target.name;

      return { ...prevState, [inputName]: inputValue };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate user input
    if (userInput.firstname.length < 2) {
      console.log("Character issue");
      setError("Character issue");
      return;
    }
    if (userInput.lastname.length < 2) {
      console.log("Character issue");
      setError("Character issue");
      return;
    }
    if (userInput.password.length < 8) {
      console.log("Passwords issue");
      setError("Character issue");
      return;
    }
    if (userInput.password !== userInput.confirmPassword) {
      console.log("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    // Send a signup request to the server
    try {
      await dispatch(
        signup(
          userInput.firstname,
          userInput.lastname,
          userInput.email,
          userInput.password,
          userInput.confirmPassword
        )
      );
    } catch (error) {
      console.error("Error signing up: ", error);
      setError("Error signing up");
      return;
    }

    // If the signup request was successful, navigate to the exercises page
    navigate("/news");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (userInput.password.length < 8) {
      console.log("Passwords issue");
      setError("Character issue");
      return;
    }

    // Send a login request to the server
    try {
      await dispatch(login(userInput.email, userInput.password));
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Error logging in");
      return;
    }

    // If the login request was successful, navigate to the exercises page
    navigate("/news");
  };

  const toggleForm = () => {
    if (formType === "signup") {
      setFormType("login");
    } else {
      setFormType("signup");
    }
  };

  return (
    <div>
      <section id="signup">
        <Navigation />
        <div className="container flex flex-col mx-auto md:justify-between md:flex-row px-6 mt-10 lg:space-x-20 md:space-x-10 space-y-0 md:space-y-0">
          <div className="flex flex-col mb-28 space-y-12 xl:ml-40">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark xl:text-center md:text-5xl">
              Ready to start your journey ?
            </h1>
            <p className="max-w-sm mx-auto text-darkGrayishBlue md:text-left">
              FitFix is a platform which makes workouts easier than ever before.
              Make your program and go to work with your friends.
            </p>
          </div>
          {formType === "signup" ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full max-w-md mb-28 mx-auto xl:mx-auto xl:mr-40"
            >
              <div className="flex items-center border-b border-gray-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={userInput.firstname}
                  placeholder="First Name"
                  name="firstname"
                  onChange={changeHandler}
                  aria-label="First Name"
                />
              </div>
              <div className="flex items-center border-b border-gray-500 py-2 mt-8">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  value={userInput.lastname}
                  onChange={changeHandler}
                  placeholder="Last Name"
                  name="lastname"
                  aria-label="Last Name"
                />
              </div>
              <div className="flex items-center border-b border-gray-500 py-2 mt-8">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  value={userInput.email}
                  onChange={changeHandler}
                  placeholder="Email Address"
                  name="email"
                  aria-label="Email Address"
                />
              </div>
              <div className="flex items-center border-b border-gray-500 py-2 mt-8">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  value={userInput.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  name="password"
                  aria-label="Password"
                />
              </div>
              <div className="flex items-center border-b border-gray-500 py-2 mt-8">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  value={userInput.confirmPassword}
                  onChange={changeHandler}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  aria-label="Confirm Password"
                />
              </div>
              <div className="mt-8 mb-8">
                <button
                  className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
                  type="submit"
                  name="submitBtn"
                >
                  Sign up
                </button>
              </div>
              <a className="flex mb-14 text-headlineDark" onClick={toggleForm}>
                Already signed up? Click to log in
              </a>
            </form>
          ) : (
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full max-w-md mb-28 mx-auto xl:mx-auto xl:mr-40"
            >
              <div className="flex items-center border-b border-gray-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  value={userInput.email}
                  placeholder="Email Address"
                  name="email"
                  onChange={changeHandler}
                  aria-label="email"
                />
              </div>
              <div className="flex items-center border-b border-gray-500 py-2 mt-8">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  value={userInput.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  name="password"
                  aria-label="Password"
                />
              </div>
              <div className="mt-8 mb-8">
                <button
                  className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
                  type="submit"
                  name="submitBtn"
                >
                  Log in
                </button>
              </div>
              <a className="flex mb-36 text-headlineDark" onClick={toggleForm}>
                Not signed up yet? Click to sign up
              </a>
            </form>
          )}
        </div>
        <Footer />
      </section>
    </div>
  );
};
