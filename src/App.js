import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Hero } from "./Screens/Hero";
import { Exercises } from "./Screens/LoggedInScreens/Exercises";
import { Product } from "./Screens/Product";
import { About } from "./Screens/About";
import { Community } from "./Screens/Community";
import { Signup } from "./Screens/Signup";
import { Profile } from "./Screens/LoggedInScreens/Profile";
import { News } from "./Screens/LoggedInScreens/News";
import { YourWorkout } from "./Screens/LoggedInScreens/YourWorkout";
import { Challenge } from "./Screens/LoggedInScreens/Challenge/Challenge";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/news" element={<News />} />
        <Route path="/yourworkout" element={<YourWorkout />} />
        <Route path="/challenges" element={<Challenge />} />
        <Route path="/product" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/getstarted" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
