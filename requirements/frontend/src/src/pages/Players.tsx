import React, { useEffect, useState } from "react";
import { Player } from "../types/api";
import Navbar from "../components/Navbar/Navbar";
import PlayerList from "../components/Players/PlayerList";
import IndexSelector from "../components/IndexSelector/IndexSelector";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Players() {
  const [index, setIndex] = useState(0);
  const limit = 40;

  const [players, setPlayers] = useState([] as Player[]);
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/players/top?offset=${index * limit}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayers(data);
        }
      });
  }, [index]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Top Players</h1>
        <PlayerList players={players} index={index} limit={limit} />
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
