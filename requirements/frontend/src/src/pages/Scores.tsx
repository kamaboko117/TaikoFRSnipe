import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Score } from "../types/api";
import ScoreList from "../components/Scores/ScoreList";

export default function Scores() {
  const [scores, setScores] = useState([] as Score[]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetch(`/api/scores/top?offset=${index}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setScores(data);
        }
      });
  }, [index]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Top Scores</h1>
        <ScoreList scores={scores} />
        {/* index selector */}
        <div className="index-selector">
          <button
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              }
            }}
          >
            {" "}
            Previous{" "}
          </button>
          <button
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            {" "}
            Next{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
