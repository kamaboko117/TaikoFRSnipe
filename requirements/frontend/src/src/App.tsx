import { Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // Le layout avec la navbar
import MainPage from "./pages/MainPage";
import Scores from "./pages/Scores";
import BeatmapPage from "./pages/BeatmapPage";
import PlayerPage from "./pages/PlayerPage";
import SearchPage from "./pages/SearchPage";
import Players from "./pages/Players";
import Snipes from "./pages/Snipes";
import About from "./pages/About";
import HallOfFame from "./pages/HallOfFame";
import { isDecember } from "./utils";
import { Snow } from "./components/Other/Snow";

function App() {
  return (
    <div>
      {isDecember() && <Snow />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="Scores" element={<Scores />} />
          <Route path="Beatmap/:id" element={<BeatmapPage />} />
          <Route path="Player/:id" element={<PlayerPage />} />
          <Route path="Search/:query" element={<SearchPage />} />
          <Route path="Players" element={<Players />} />
          <Route path="Players/Top" element={<Players />} />
          <Route path="Players/HallOfFame" element={<HallOfFame />} />
          <Route path="Snipes" element={<Snipes />} />
          <Route path="About" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
