import React from "react";
import { Player } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function PlayerItem({
  player,
  rank,
}: {
  player: Player;
  rank: number;
}) {
  const navigate = useNavigate();
  const clickPlayer = () => {
    navigate(`/player/${player.id}`);
  };
  const onAuxClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/player/${player.id}`);
    }
  };

  return (
    <tr
      className="table-row"
      onClick={clickPlayer}
      onMouseDown={onAuxClick}
      style={{ cursor: "pointer" }}
    >
      <td style={{ fontWeight: "800" }}>#{rank}</td>
      <td>{player.name}</td>
      <td>{player.topFRCount}</td>
    </tr>
  );
}
