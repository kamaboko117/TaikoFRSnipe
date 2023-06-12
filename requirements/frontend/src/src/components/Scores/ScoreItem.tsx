import React from "react";
import { Score } from "../../types/api";
import { Link } from "react-router-dom";

export default function ScoreItem({
  score,
  rank,
}: {
  score: Score;
  rank: number;
}) {
  return (
    <Link className="table-row" to={`/Beatmap/${score.beatmap.id}`}>
      <td style={{ fontWeight: "800" }}>#{rank}</td>
      <td>
        {score.beatmap.artist} - {score.beatmap.song} [
        {score.beatmap.difficulty}]
      </td>
      <td>{score.mods}</td>
      <td>{Number(score.acc * 100).toFixed(2)}%</td>
      <td>{score.missCount}</td>
      <td>{score.score}</td>
      <td>{score.pp}</td>
      <Link className="player-name" to={`/Player/${score.player.id}`}>
        {score.player.name}
      </Link>
    </Link>
  );
}
