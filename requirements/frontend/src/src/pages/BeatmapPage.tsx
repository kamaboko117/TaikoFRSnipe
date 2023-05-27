import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Beatmap, Snipe } from "../types/api";
import BeatmapItemFull from "../components/Beatmaps/BeatmapItemFull";
import Navbar from "../components/Navbar/Navbar";
import { Score } from "../types/api";
import ScoreDetail from "../components/Scores/ScoreDetail";
import SnipeHistory from "../components/Snipes/SnipeHistory";

export default function BeatmapPage() {
  const id = parseInt(useParams().id as string);
  const [beatmap, setBeatmap] = useState<Beatmap | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [snipes, setSnipes] = useState([] as Snipe[]);
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
    fetch(`/api/snipes/beatmapID/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
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
        <ScoreDetail
          score={score}
          beatmap={beatmap}
          clickPlayer={clickPlayer}
        />
        <SnipeHistory snipes={snipes} />
      </div>
    </div>
  );
}
