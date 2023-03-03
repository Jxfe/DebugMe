import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cris from "./AboutMe/Cris";
import Emilee from "./AboutMe/Emilee";
import Hayat from "./AboutMe/Hayat";
import Hector from "./AboutMe/Hector";
import Jeff from "./AboutMe/Jeff";
import Jiji from "./AboutMe/Jiji";
import Matt from "./AboutMe/Matt";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/emilee" element={<Emilee />} />
        <Route path="/about/jiji" element={<Jiji />} />
        <Route path="/about/cris" element={<Cris />} />
        <Route path="/about/matt" element={<Matt />} />
        <Route path="/about/hayat" element={<Hayat />} />
        <Route path="/about/jeff" element={<Jeff />} />
        <Route path="/about/hector" element={<Hector />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
