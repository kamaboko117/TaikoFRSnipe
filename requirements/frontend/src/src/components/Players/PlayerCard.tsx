import React from "react";
import { Player } from "../../types/api";

export default function PlayerCard({
  player,
  onClick,
}: {
  player: Player;
  onClick: () => void;
}) {
  const onAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/player/${player.id}`);
    }
  };

  return (
    <div className="player-card" onClick={onClick} onMouseDown={onAuxClick}>
      <div className="player-card-avatar">
        <img src={`https://a.ppy.sh/${player.id}`} alt="avatar" />
      </div>
      <div className="player-card-info">
        <span className="player-card-name">{player.name}</span>
        <span className="player-card-top-count">
          {player.topFRCount} Top FR
        </span>
      </div>
    </div>
  );
}
