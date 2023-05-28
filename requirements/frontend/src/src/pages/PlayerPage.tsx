import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Player, Score } from "../types/api";
import ScoreList from "../components/Scores/ScoreList";
import IndexSelector from "../components/IndexSelector/IndexSelector";

export default function PlayerPage() {
  const id = parseInt(useParams().id as string);
  const [player, setPlayer] = useState<Player | null>(null);
  const [scores, setScores] = useState([] as Score[]);
  const [index, setIndex] = useState(0);
  const limit = 10;
  
  useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayer(data);
        }
      });
    fetch(`/api/scores/player/${id}?limit=${limit}&offset=${index * limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setScores(data);
        }
      });
  }, [id, index]);

  const clickPlayer = () => {
    window.open(`https://osu.ppy.sh/users/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="user-profile-header" onClick={clickPlayer}>
          <div className="user-profile-avatar">
            <img
              src={`https://a.ppy.sh/${player?.id}`}
              alt="avatar"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="user-profile-header-info">
            <h1>{player?.name}</h1>
            <h2>Top FR Count: {player?.topFRCount}</h2>
          </div>
        </div>
        <h1>Top FRs</h1>
        <IndexSelector index={index} setIndex={setIndex} />
        <ScoreList scores={scores} index={index} limit={limit} />
        <IndexSelector index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
