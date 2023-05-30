import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "../types/api";
import { Beatmap } from "../types/api";
import Navbar from "../components/Navbar/Navbar";
import PlayerCard from "../components/Players/PlayerCard";
import BeatmapItem from "../components/Beatmaps/BeatmapItem";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function SearchPage() {
  // const [players, setPlayers] = useState([] as Player[]);
  const [result, setResult] = useState({ players: [], beatmaps: [] } as {
    players: Player[];
    beatmaps: Beatmap[];
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/search/${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setResult(data);
          console.log(data);
          setIsLoaded(true);
        }
      });
  }, [query]);

  if (!isLoaded) {
    return (
      <div>
        <Navbar />
        <div className="wrapper">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Results for {query}</h1>
        <div className="player-list">
          {result.players.map((player) => (
            <PlayerCard
              player={player}
              key={player.id}
              onClick={() => {
                navigate(`/Player/${player.id}`);
              }}
            />
          ))}
        </div>
        <div className="player-list">
          {result.beatmaps.map((beatmap) => (
            <BeatmapItem beatmap={beatmap} key={beatmap.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
