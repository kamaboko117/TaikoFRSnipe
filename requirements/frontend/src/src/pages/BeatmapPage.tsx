import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Beatmap } from "../types/api";
import BeatmapItemFull from "../components/Beatmaps/BeatmapItemFull";
import Navbar from "../components/Navbar";

export default function BeatmapPage() {
  const id = parseInt(useParams().id as string);
  const [beatmap, setBeatmap] = useState<Beatmap | null>(null);
  React.useEffect(() => {
    fetch(`/api/beatmaps/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBeatmap(data);
        }
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        {beatmap ? <BeatmapItemFull beatmap={beatmap} /> : <h1>Loading...</h1>}
      </div>
    </div>
  );
}
