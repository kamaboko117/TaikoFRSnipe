import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BeatmapList from "../components/Beatmaps/BeatmapList";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import { Beatmap, Snipe } from "../types/api";
import SnipeList from "../components/Snipes/SnipeList";

export default function MainPage() {
  const [snipes, setSnipes] = useState([] as Snipe[]);
  React.useEffect(() => {
    let snipesArray = [] as Snipe[];
    fetch("/api/snipes/")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log("snipes");
          console.log(data);
          setSnipes(data);
          snipesArray = data;
        }
      })
      .then(() => {
        let beatmapArray = [] as Beatmap[];
        for (let i = 0; i < snipesArray.length; i++) {
          beatmapArray.push(snipesArray[i].beatmap);
        }
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <SnipeList snipes={snipes} />
        <ManualUpdateForm />
      </div>
    </div>
  );
}
