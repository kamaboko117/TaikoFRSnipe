import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Player } from "../types/api";

export default function PlayerPage() {
  const id = parseInt(useParams().id as string);
  const [player, setPlayer] = React.useState<Player | null>(null);

  React.useEffect(() => {
    fetch(`/api/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayer(data);
        }
      });
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <img
          src={`https://a.ppy.sh/${player?.id}`}
          alt="avatar"
          style={{ width: "200px", height: "200px" }}
        />
        <h1>{player?.name}</h1>
        <h2>Top FR Count: {player?.topFRCount}</h2>
      </div>
    </div>
  );
}
