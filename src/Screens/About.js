import React from "react";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

export const About = () => {
  return (
    <div>
      <section id="product">
        <Navigation />
        <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex md:items-center flex-col mb-28 space-y-12">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-center">
              A history about a hole in the fitness industry
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              Once upon a time there was a ton of fitness applications. You
              could assemble a program but it was a messed up design, bombarded
              with commercials or locked behind a paywall. Neither could you do
              anything other than createa a program.
              <br />
              <br />
              Not anymore - We are here to create the complete package and give
              it to you. FOR FREE.
              <br />
              <br />
              While this is only a beta version we aim to deliver a complete
              option. A community where people can find partners, create workout
              programs, stay connected.
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href=""
                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};
