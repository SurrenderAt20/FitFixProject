import React from "react";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

export const Product = () => {
  return (
    <div>
      <section id="product">
        <Navigation />
        <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex md:items-center flex-col mb-28 space-y-12">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-center">
              Our mission is much more than a fitness application
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              We aim to provide you with a fitness application available for
              free to anyone. We launch as a simple web application but strive
              to evolve to a progressive web application available for all
              devices and in offline mode
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
