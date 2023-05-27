import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Score } from "../types/api";
import ScoreList from "../components/Scores/ScoreList";
import IndexSelector from "../components/IndexSelector/IndexSelector";

export default function Scores() {
  const [scores, setScores] = useState([] as Score[]);
  const [index, setIndex] = useState(0);
  const limit = 40;
  useEffect(() => {
    fetch(`/api/scores/top?offset=${index * limit}&limit=${limit}`)
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
        <IndexSelector setIndex={setIndex} index={index} />
        <ScoreList scores={scores} index={index} limit={limit}/>
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
