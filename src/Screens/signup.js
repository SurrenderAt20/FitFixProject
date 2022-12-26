import React from "react";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

export const Signup = () => {
  return (
    <div>
      <section id="signup">
        <Navigation />
        <div className="container flex flex-col md:justify-between md:flex-row px-6 mx-auto mt-10 lg:space-x-20 md:space-x-10 space-y-0 md:space-y-0">
          <div className="flex flex-col mb-28 space-y-12 xl:ml-40">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark xl:text-center md:text-5xl">
              Ready to start your journey ?
            </h1>
            <p className="max-w-sm mx-auto text-darkGrayishBlue md:text-left">
              FitFix is a platform which makes workouts easier than ever before.
              Make your program and go to work with your friends.
            </p>
          </div>
          <form className="w-full max-w-md mb-28 xl:mr-40">
            <div className="flex items-center border-b border-gray-500 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="First Name"
                aria-label="First Name"
              />
            </div>
            <div className="flex items-center border-b border-gray-500 py-2 mt-8">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Last Name"
                aria-label="Last Name"
              />
            </div>
            <div className="flex items-center border-b border-gray-500 py-2 mt-8">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
              />
            </div>
            <div className="flex items-center border-b border-gray-500 py-2 mt-8">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            <div className="flex items-center border-b border-gray-500 py-2 mt-8">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
              />
            </div>
            <div className="mt-8 mb-8">
              <button
                className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </section>
    </div>
  );
};
