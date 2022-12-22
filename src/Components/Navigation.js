import React from "react";
import logo from "./img/logo.svg";

export const Navigation = () => {
  return (
    <div>
      <div className="relative container mx-auto p-6 border-b-2 border-darkGrayishBlue">
        <div className="flex items-center justify-between">
          <div className="pt-2">
            <img src={logo} alt="Logo"></img>
          </div>

          <div className="hidden md:flex space-x-6 font-semibold">
            <a href="" className="hover:text-darkGrayishBlue">
              Product
            </a>
            <a href="" className="hover:text-darkGrayishBlue">
              About
            </a>
            <a href="" className="hover:text-darkGrayishBlue">
              Community
            </a>
          </div>
          <a
            href=""
            className="hidden md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};
