import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Scores from "./pages/Scores";
import BeatmapPage from "./pages/BeatmapPage";
import PlayerPage from "./pages/PlayerPage";
import SearchPage from "./pages/SearchPage";
import Players from "./pages/Players";
import Snipes from "./pages/Snipes";
import About from "./pages/About";
import HallOfFame from "./pages/HallOfFame";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Scores" element={<Scores />} />
        <Route path="/Beatmap/:id" element={<BeatmapPage />} />
        <Route path="/Player/:id" element={<PlayerPage />} />
        <Route path="/Search/:query" element={<SearchPage />} />
        <Route path="/Players" element={<Players />} />
        <Route path="/Players/Top" element={<Players />} />
        <Route path="/Players/HallOfFame" element={<HallOfFame />} />
        <Route path="/Snipes" element={<Snipes />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
