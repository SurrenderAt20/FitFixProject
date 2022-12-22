import logo from "./logo.svg";
import "./App.css";
import { Navigation } from "./Components/Navigation";
import { Hero } from "./Components/Hero";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
    </div>
  );
}

export default App;
