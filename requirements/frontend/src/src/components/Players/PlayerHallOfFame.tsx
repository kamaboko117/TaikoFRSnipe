import React from "react";
import { Player } from "../../types/api";
import { Link } from "react-router-dom";

export default function PlayerHallOfFame({
  player,
  description,
  children,
}: {
  player: Player;
  description: string;
  children: any;
}) {
  return (
    <div className="hof-element">
      {children}
      <Link className="hof-card" to={`/Player/${player.id}`}>
        <img
          className="hof-card_avatar"
          src={`https://a.ppy.sh/${player.id}`}
          alt={player.name}
        />
        <div className="hof-card_content">
          <p className="player-name">{player.name}</p>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}
