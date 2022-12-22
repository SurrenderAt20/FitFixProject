import React from "react";

export const Hero = () => {
  return (
    <div>
      <section id="hero">
        {/* Flex Container */}
        <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex flex-col mb-32 space-y-12 md:w1/2">
            <div className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
              Bring everyone together to build better products
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
