import React from "react";
import { Outlet } from "react-router-dom";
import { Exercises } from "../Exercises";
import Auth from "../../Routes/Auth";

const ProtectedExercises = () => {
  <Auth>
    <Outlet>
      <Exercises />
    </Outlet>
  </Auth>;
};

export default ProtectedExercises;
