import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Beatmap } from "../types/api";
import BeatmapItemFull from "../components/Beatmaps/BeatmapItemFull";
import Navbar from "../components/Navbar";
import { Score } from "../types/api";

export default function BeatmapPage() {
  const id = parseInt(useParams().id as string);
  const [beatmap, setBeatmap] = useState<Beatmap | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`/api/beatmaps/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBeatmap(data);
        }
      })
      .then(() => {
        fetch(`/api/scores/beatmapID/${id}`)
          .then((res) => res.json())
          .catch((err) => console.log(err))
          .then((data) => {
            if (!data.error) {
              setScore(data);
            } else {
              setScore(null);
            }
          });
      });
  }, [id]);

  const clickPlayer = () => {
    if (!beatmap) return;
    navigate(`/Player/${beatmap.topPlayer.id}`);
  };

  if (!beatmap) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <BeatmapItemFull beatmap={beatmap} />
        <div>
          <h1>Current Top FR</h1>
          {beatmap.topPlayer ? (
            <h2 onClick={clickPlayer} style={{ cursor: "pointer" }}>
              {beatmap.topPlayer.name}
            </h2>
          ) : (
            <h2>None</h2>
          )}
          <h3>Score: {score?.score}</h3>
          <h3>Accuracy: {score ? `${(score.acc * 100).toFixed(2)}%` : ""}</h3>
          <h3>Combo: {score?.maxCombo}</h3>
          <h3>Mods: {score?.mods}</h3>
          <h3>PP: {score?.pp}</h3>
        </div>
      </div>
    </div>
  );
}
