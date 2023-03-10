import React from "react";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";

export const Community = () => {
  return (
    <div>
      <section id="product">
        <Navigation />
        <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex md:items-center flex-col mb-28 space-y-12">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-center">
              The community growth is about much more than you and me
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              It is about creating the perfect platform for everybody to create
              where it is possible to share tips, tricks, find workout partners
              and much more. As a first we are live on a discord server but aim
              to create our very own intra.
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="https://discord.gg/w5MjRe7s"
                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Check the Discord
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
};
