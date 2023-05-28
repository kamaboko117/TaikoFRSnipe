import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import { Beatmap, Snipe } from "../types/api";
import SnipeList from "../components/Snipes/SnipeList";
const API_URL = process.env.API_URL;

export default function MainPage() {
  const [snipes, setSnipes] = useState([] as Snipe[]);
  React.useEffect(() => {
    let snipesArray = [] as Snipe[];
    fetch(`${API_URL}/snipes/latest/10`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
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
        <h1>Latest Taiko French Tops</h1>
        <SnipeList snipes={snipes} />
        <ManualUpdateForm />
      </div>
    </div>
  );
}
