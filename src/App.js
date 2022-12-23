import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Hero } from "./Screens/Hero";
import { Product } from "./Screens/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
