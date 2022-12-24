import React from "react";
import { Link } from "react-router-dom";
import logo from "../Screens/img/GartnerPaint.png";
import "./Navigation.css";

export const Navigation = () => {
  return (
    <div>
      <div className="relative container mx-auto p-6 border-b-2 border-darkGrayishBlue">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <img className="img-responsive" src={logo} alt="Logo"></img>
          </div>
          <div className="hidden md:flex space-x-6 font-semibold">
            <Link to="/" className="hover:text-darkGrayishBlue">
              Home
            </Link>
            <Link to="/product" className="hover:text-darkGrayishBlue">
              Product
            </Link>
            <Link to="/about" className="hover:text-darkGrayishBlue">
              About
            </Link>
            <Link to="/community" className="hover:text-darkGrayishBlue">
              Community
            </Link>
          </div>
          <Link
            to=""
            className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
