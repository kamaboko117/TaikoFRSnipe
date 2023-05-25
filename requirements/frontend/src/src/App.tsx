import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Scores from "./pages/Scores";
import BeatmapPage from "./pages/BeatmapPage";
import PlayerPage from "./pages/PlayerPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Scores" element={<Scores />} />
        <Route path="/Beatmap/:id" element={<BeatmapPage />} />
        <Route path="/Player/:id" element={<PlayerPage />} />
      </Routes>
    </div>
  );
}

export default App;
