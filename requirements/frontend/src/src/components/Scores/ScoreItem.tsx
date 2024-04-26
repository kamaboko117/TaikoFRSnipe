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
      <td className="secondary-td">{score.mods}</td>
      <td className="secondary-td">{Number(score.acc * 100).toFixed(2)}%</td>
      <td className="secondary-td">{score.missCount}</td>
      <td className="secondary-td">{score.score}</td>
      <td className="secondary-td">{score.pp}</td>
      <td>
        <Link className="player-name" to={`/Player/${score.player.id}`}>
          {score.player.name}
        </Link>
      </td>
    </Link>
  );
}
