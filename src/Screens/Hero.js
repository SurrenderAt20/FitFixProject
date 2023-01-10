import React from "react";
import muscle from "./img/muscle1.png";
import anna from "./img/anna.svg";
import victor from "./img/victor.svg";
import myAvatar from "./img/myAvatar.svg";
import { Navigation } from "../Components/Navigation";
import { Footer } from "../Components/Footer";
import "./fonts/fonts.css";

export const Hero = () => {
  return (
    <div>
      <Navigation />
      <section id="hero">
        <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <div className="flex flex-col mb-28 space-y-12 md:w-1/2">
            <h1 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-left">
              Inspire and encourage to build a better future
            </h1>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              FitFix is a platform which makes workouts easier than ever before.
              Make your program and go to work with your friends.
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
          <div className="md:w-1/2">
            <img src={muscle} alt="illustrationintro"></img>
          </div>
        </div>
      </section>
      <section id="features">
        <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-4xl font-bold text-center text-headlineDark md:text-left">
              What's different about FitFix ?
            </h2>
            <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
              Sick of paywalls and restrictions by expensive applications?
              FitFix is free and open source and is in a segment of first movers
              when it comes to making social initiatives within fitness!
            </p>
          </div>

          <div className="flex flex-col space-y-8 md:w-1/2">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div class="flex items-center space-x-2">
                  <div class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                    01
                  </div>
                  <h3 class="text-base font-bold md:mb-4 md:hidden text-headlineDark">
                    Track Fitness Progress
                  </h3>
                </div>
              </div>

              <div>
                <h3 class="hidden mb-4 text-lg font-bold md:block text-headlineDark">
                  Track fitness progress
                </h3>
                <p class="text-darkGrayishBlue">
                  Track your fitness progress by adjusting repititions, weight
                  and more! <b>This Feature is still under development</b>
                </p>
              </div>
            </div>

            <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div class="flex items-center space-x-2">
                  <div class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                    02
                  </div>
                  <h3 class="text-base text-headlineDark font-bold md:mb-4 md:hidden">
                    Challenge your friends
                  </h3>
                </div>
              </div>

              <div>
                <h3 class="hidden mb-4 text-lg text-headlineDark font-bold md:block">
                  Challenge your friends
                </h3>
                <p class="text-darkGrayishBlue">
                  We aim to provide great options in order for you and your
                  friends to inspire eachother. Let your inner competitive
                  sports guy lose and start now
                </p>
              </div>
            </div>

            <div class="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div class="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div class="flex items-center space-x-2">
                  <div class="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                    03
                  </div>
                  <h3 class="text-base text-headlineDark font-bold md:mb-4 md:hidden">
                    Create advanced fitness programs
                  </h3>
                </div>
              </div>

              <div>
                <h3 class="hidden mb-4 text-lg text-headlineDark font-bold md:block">
                  Create advanced fitness programs
                </h3>
                <p class="text-darkGrayishBlue">
                  With a huge catalog of exercises you'll be able to create the
                  perfect program suited just to your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <section id="testimonials">
          <div class="max-w-6xl px-5 mx-auto mt-32 text-center">
            <h2 class="text-4xl font-bold text-center text-headlineDark">
              You Asked, We Delivered
            </h2>
            <p class=" text-darkGrayishBlue mt-4">
              This is what our interviewees said about there needs and wants.
            </p>
            <div class="flex flex-col mt-24 md:flex-row md:space-x-6">
              <div class="flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3">
                <img src={myAvatar} class="w-16 -mt-14" alt="" />
                <h5 class="text-lg font-bold">Anna</h5>
                <p class="text-sm text-darkGrayishBlue">
                  I spend two years in the army as a military constable. When I
                  stopped I carried on exercising in a gym. The application
                  provided by fitness world wasn't significant and I therefore
                  limited my exercise program
                </p>
              </div>
              <div class="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
                <img src={anna} class="w-16 -mt-14" alt="" />
                <h5 class="text-lg font-bold">Rikke</h5>
                <p class="text-sm text-darkGrayishBlue">
                  Most of my life I have prefered to workout alone but my local
                  gym never did anything to create social incentives either. I
                  am ready and I want to be a bigger part of the fitness
                  community
                </p>
              </div>
              <div class="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3">
                <img src={victor} class="w-16 -mt-14" alt="" />
                <h5 class="text-lg font-bold">Mads</h5>
                <p class="text-sm text-darkGrayishBlue">
                  Juggling between a social life and studies can be tough. I
                  moved to Copenhagen for studies but didn't have a social
                  network. I do fitness. A lot. Better social options would be
                  something I think I enjoyed
                </p>
              </div>
            </div>
            <div class="my-16">
              <a
                href="#"
                class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
              >
                Get Started
              </a>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};
