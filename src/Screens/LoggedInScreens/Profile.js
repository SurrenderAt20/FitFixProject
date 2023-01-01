import React from "react";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../store/actions/userActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/profile");
      } else {
        navigate("/");
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate user input
    if (firstname.length < 2) {
      console.log("Character issue");
      setError("Character issue");
      return;
    }
    if (lastname.length < 2) {
      console.log("Character issue");
      setError("Character issue");
      return;
    }
    if (password.length < 8) {
      console.log("Passwords issue");
      setError("Character issue");
      return;
    }

    // Send a signup request to the server
    try {
      await dispatch(updateProfile(firstname, lastname, email, password));
    } catch (error) {
      console.error("Error signing up: ", error);
      setError("Error signing up");
      return;
    }

    navigate("/profile?Profile+Updated");
  };

  return (
    <div>
      <LoggedInNav />
      <div className="container flex flex-col mx-auto md:justify-between md:flex-row px-6 mt-10 lg:space-x-20 md:space-x-10 space-y-0 md:space-y-0">
        <div className="flex flex-col mb-28 space-y-12 xl:ml-40">
          <h1 className="max-w-md text-4xl font-bold text-headlineDark xl:text-center md:text-5xl">
            Your profile, your privacy
          </h1>
          <p className="max-w-sm mx-auto text-darkGrayishBlue md:text-left">
            Feel like there should be a change in your profile? Do it here
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md mb-28 mx-auto xl:mx-auto xl:mr-40"
        >
          <div className="flex items-center border-b border-gray-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
              placeholder="First Name"
              name="newFirstname"
              aria-label="First Name"
            />
          </div>
          <div className="flex items-center border-b border-gray-500 py-2 mt-8">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              placeholder="Last Name"
              name="newLastname"
              aria-label="Last Name"
            />
          </div>
          <div className="flex items-center border-b border-gray-500 py-2 mt-8">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              placeholder="Email Address"
              name="newEmail"
              aria-label="Email Address"
            />
          </div>
          <div className="flex items-center border-b border-gray-500 py-2 mt-8">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              placeholder="Password"
              name="newPassword"
              aria-label="Password"
            />
          </div>
          <div className="mt-8 mb-8">
            <button
              className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              type="submit"
              name="submitBtn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
