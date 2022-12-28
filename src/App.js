import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Hero } from "./Screens/Hero";
import { Product } from "./Screens/Product";
import { About } from "./Screens/About";
import { Community } from "./Screens/Community";
import { Signup } from "./Screens/Signup";
import { ProtectedRoutes } from "./Routes/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
        </Route>
        <Route path="/getstarted" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
