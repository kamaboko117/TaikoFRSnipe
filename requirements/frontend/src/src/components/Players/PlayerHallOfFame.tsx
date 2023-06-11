import React from "react";
import { Player } from "../../types/api";

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
      <div className="hof-card">
        <img src={`https://a.ppy.sh/${player.id}`} alt={player.name} />
        <div className="hof-card_content">
          <p className="player-name">{player.name}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
