import React from "react";
import { Player } from "../../types/api";
import { Link } from "react-router-dom";

export default function PlayerCard({
  player,
}: {
  player: Player;
}) {
  return (
    <Link className="player-card" to={`/player/${player.id}`}>
      <div className="player-card-avatar">
        <img src={`https://a.ppy.sh/${player.id}`} alt="avatar" />
      </div>
      <div className="player-card-info">
        <span className="player-card-name">{player.name}</span>
        <span className="player-card-top-count">
          {player.topFRCount} Top FR
        </span>
      </div>
    </Link>
  );
}
