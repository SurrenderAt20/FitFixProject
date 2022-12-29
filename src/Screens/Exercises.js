import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

export const Exercises = ({ req, ...props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if the user is logged in by checking the session data
  if (!req.session.user) {
    // If the user is not logged in, navigate to the '/getstarted' page
    navigate("/getstarted");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="mt-8 mb-8">
        <button
          className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
          type="submit"
          name="submitBtn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <div>exercises - this site is only for logged in users!</div>
    </div>
  );
};
