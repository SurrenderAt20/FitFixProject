import React from "react";
import { LoggedInNav } from "../../Components/LoggedInComponents/LoggedInNav";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const News = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        navigate("/news");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <section id="product">
        <LoggedInNav />
        <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex md:items-center flex-col mb-28 space-y-12">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-center">
              The beta launch is finaly here and never have we been more
              excited!
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              We are happy and proud to to present the beta launch of the
              FitFlix application. While it is save to say that the amount of
              features yet are limited we still offer a small variety of
              possibilities.
            </p>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              We are so happy that you have signed up and started your journey.
              We appreciate any feedback and hope that you would like to assist
              us in so. Meanwhile enjoy the launch.
            </p>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              Kind regards. The FitFix team
            </p>
            <div className="flex justify-center md:justify-start"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
