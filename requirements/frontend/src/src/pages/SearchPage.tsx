import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "../types/api";
import Navbar from "../components/Navbar/Navbar";

export default function SearchPage() {
  const [players, setPlayers] = useState([] as Player[]);
  const { query } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/players/search?name=${query}`)
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
            <div
              className="player-list-item"
              key={player.id}
              onClick={() => {
                navigate(`/Player/${player.id}`);
              }}
            >
              <h2>{player.name}</h2>
              <h3>Top FR Count: {player.topFRCount}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
