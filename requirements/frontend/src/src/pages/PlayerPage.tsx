import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Player, Score } from "../types/api";
import ScoreList from "../components/Scores/ScoreList";

export default function PlayerPage() {
  const id = parseInt(useParams().id as string);
  const [player, setPlayer] = useState<Player | null>(null);
  const [scores, setScores] = useState([] as Score[]);
  // const [index, setIndex] = useState(0);
  // const limit = 40;
  
  useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayer(data);
        }
      });
    fetch(`/api/scores/player/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setScores(data);
        }
      });
  }, [id]);

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
        <ScoreList scores={scores} index={0} limit={10} />
      </div>
    </div>
  );
}
