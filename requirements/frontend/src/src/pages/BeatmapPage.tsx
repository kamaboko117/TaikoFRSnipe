import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Beatmap, Snipe, Score } from "../types/api";
import BeatmapItemFull from "../components/Beatmaps/BeatmapItemFull";
import ScoreDetail from "../components/Scores/ScoreDetail";
import SnipeHistory from "../components/Snipes/SnipeHistory";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function BeatmapPage() {
  const id = parseInt(useParams().id as string);
  const [beatmap, setBeatmap] = useState<Beatmap | null>(null);
  const [score, setScore] = useState<Score | null>(null);
  const [snipes, setSnipes] = useState([] as Snipe[]);
  const [refreshed, setRefreshed] = useState(false);
  const navigate = useNavigate();

  const updateBeatmap = () => {
    if (id) {
      fetch(`${REACT_APP_API_URL}/beatmaps`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setRefreshed(true);
          }
        });
    }
  };

  useEffect(() => {
    setRefreshed(false);
    fetch(`${REACT_APP_API_URL}/beatmaps/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBeatmap(data);
        }
      })
      .then(() => {
        fetch(`${REACT_APP_API_URL}/scores/beatmapID/${id}`)
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

    fetch(`${REACT_APP_API_URL}/snipes/beatmapID/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
      });
  }, [id, refreshed]);

  const clickPlayer = () => {
    if (!beatmap) return;
    navigate(`/Player/${beatmap.topPlayer.id}`);
  };

  if (!beatmap) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="wrapper">
      <BeatmapItemFull beatmap={beatmap} />
      <ScoreDetail score={score} beatmap={beatmap} clickPlayer={clickPlayer} />
      <h1>Snipe History</h1>
      <SnipeHistory snipes={snipes} />
      <button onClick={updateBeatmap}>refresh</button>
    </div>
  );
}
