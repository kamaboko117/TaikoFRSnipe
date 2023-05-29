import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "../types/api";
import Navbar from "../components/Navbar/Navbar";
import PlayerCard from "../components/Players/PlayerCard";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function SearchPage() {
  const [players, setPlayers] = useState([] as Player[]);
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/players/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayers(data);
          console.log(data);
        }
      });
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Results for {query}</h1>
        <div className="player-list">
          {players.map((player) => (
            <PlayerCard
              player={player}
              key={player.id}
              onClick={() => {
                navigate(`/Player/${player.id}`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
