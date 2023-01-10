import React from "react";
import { Link } from "react-router-dom";
import instagram from "../Screens/img/icon-instagram.svg";
import twitter from "../Screens/img/icon-twitter.svg";
import pinterest from "../Screens/img/icon-pinterest.svg";
import youtube from "../Screens/img/icon-youtube.svg";
import facebook from "../Screens/img/icon-facebook.svg";

export const Footer = () => {
  return (
    <div>
      <footer class="bg-veryDarkBlue">
        <div class="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div class="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
            <div class="mx-auto my-6 text-center text-white md:hidden"></div>
            <div>
              <img src="img/logo-white.svg" class="h-8" alt="" />
            </div>
            <div class="flex justify-center space-x-4">
              <Link href="#">
                <img src={facebook} alt="" class="h-8" />
              </Link>
              <Link href="#">
                <img src={youtube} alt="" class="h-8" />
              </Link>
              <Link href="#">
                <img src={twitter} alt="" class="h-8" />
              </Link>
              <Link href="#">
                <img src={pinterest} alt="" class="h-8" />
              </Link>
              <Link href="#">
                <img src={instagram} alt="" class="h-8" />
              </Link>
            </div>
          </div>
          <div class="flex justify-around space-x-32">
            <div class="flex flex-col space-y-3 text-white">
              <Link to="/" class="hover:text-brightRed">
                Home
              </Link>
              <Link to="/community" class="hover:text-brightRed">
                Community
              </Link>
              <Link to="/product" class="hover:text-brightRed">
                Product
              </Link>
              <Link to="/about" class="hover:text-brightRed">
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
