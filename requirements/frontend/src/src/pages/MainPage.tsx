import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import ManualUpdateForm from "../components/Beatmaps/manualUpdateForm";
import { Beatmap, Snipe } from "../types/api";
import SnipeList from "../components/Snipes/SnipeList";
import { useNavigate } from "react-router-dom";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function MainPage() {
  const [snipes, setSnipes] = useState([] as Snipe[]);
  const navigate = useNavigate();
  React.useEffect(() => {
    let snipesArray = [] as Snipe[];
    fetch(`${REACT_APP_API_URL}/snipes/latest/10`)
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
        <button onClick={() => navigate("/Snipes")}>View All</button>
        <ManualUpdateForm />
      </div>
    </div>
  );
}
