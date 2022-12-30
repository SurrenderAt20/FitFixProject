import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import logo from "../../Screens/img/GartnerPaint.png";
import "./LoggedInNav.css";

export const LoggedInNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="relative container mx-auto p-6 border-b-2 border-darkGrayishBlue">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <Link to="/">
              <img className="img-responsive" src={logo} alt="Logo"></img>
            </Link>
          </div>
          <div className="hidden md:flex space-x-6 font-semibold">
            <Link to="/exercises" className="hover:text-darkGrayishBlue">
              Exercises
            </Link>
            <Link to="/profile" className="hover:text-darkGrayishBlue">
              Profile
            </Link>
            <Link to="/about" className="hover:text-darkGrayishBlue">
              About
            </Link>
            <Link to="/community" className="hover:text-darkGrayishBlue">
              Community
            </Link>
          </div>
          <Link
            onClick={handleLogout}
            to="/getstarted"
            className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};
