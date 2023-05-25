import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Scores from "./pages/Scores";
import BeatmapPage from "./pages/BeatmapPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Scores" element={<Scores />} />
        <Route path="/Beatmap/:id" element={<BeatmapPage />} />
      </Routes>
    </div>
  );
}

export default App;
