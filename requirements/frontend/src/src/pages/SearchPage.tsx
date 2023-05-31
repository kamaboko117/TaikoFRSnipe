import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mapset, Player } from "../types/api";
import Navbar from "../components/Navbar/Navbar";
import PlayerCard from "../components/Players/PlayerCard";
import MapsetItem from "../components/Beatmaps/MapsetItem";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function SearchPage() {
  const [result, setResult] = useState({ players: [], mapsets: [] } as {
    players: Player[];
    mapsets: Mapset[];
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
        <div className="result-list-group">
          <h1>Players</h1>
          <div className="result-list-group-content">
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
        </div>
        <div className="result-list-group">
          <h1>Beatmaps</h1>
          <div className="result-list-group-content">
            {result.mapsets.map((mapset) => (
              <MapsetItem
                mapset={mapset}
                key={mapset.id}
                onClick={() => {
                  navigate(`/Beatmap/${mapset.beatmaps[0].id}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
