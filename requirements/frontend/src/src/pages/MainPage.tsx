import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BeatmapList from "../components/Beatmaps/BeatmapList";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import { Beatmap, Snipe } from "../types/api";

export default function MainPage() {
  // const [snipes, setSnipes] = useState([] as Snipe[]);
  const [beatmaps, setBeatmaps] = useState([] as Beatmap[]);
  React.useEffect(() => {
    let snipesArray = [] as Snipe[];
    fetch("/api/snipes/")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log("snipes");
          console.log(data);
          // setSnipes(data);
          snipesArray = data;
        }
      })
      .then(() => {
        let beatmapArray = [] as Beatmap[];
        for (let i = 0; i < snipesArray.length; i++) {
          beatmapArray.push(snipesArray[i].beatmap);
        }
        setBeatmaps(beatmapArray);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <BeatmapList beatmaps={beatmaps} />
        {/* <SnipeList snipes={snipes} /> */}
        <ManualUpdateForm />
      </div>
    </div>
  );
}
