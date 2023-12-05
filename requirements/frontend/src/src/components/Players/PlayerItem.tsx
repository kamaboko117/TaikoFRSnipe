import React from "react";
import { Player } from "../../types/api";
import { Link } from "react-router-dom";

export default function PlayerItem({
  player,
  rank,
}: {
  player: Player;
  rank: number;
}) {
  return (
    <Link
      className="table-row"
      to={`/player/${player.id}`}
      style={{ cursor: "pointer" }}
    >
      <td style={{ fontWeight: "800" }}>#{rank}</td>
      <td>{player.name}</td>
      <td>{player.topFRCount}</td>
    </Link>
  );
}
