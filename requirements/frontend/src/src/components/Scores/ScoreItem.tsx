import React from "react";
import { Score } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function ScoreItem({ score, rank }: { score: Score, rank: number }) {
  const navigate = useNavigate();
  const clickPlayer = () => {
    navigate(`/player/${score.player.id}`);
  };
  const clickBeatmap = () => {
    navigate(`/beatmap/${score.beatmap.id}`);
  };
  return (
    <tr className="table-row">
      <td style={{fontWeight: "800"}}>#{rank}</td>
      <td onClick={clickBeatmap} style={{ cursor: "pointer" }}>
        {score.beatmap.artist} - {score.beatmap.song} [
        {score.beatmap.difficulty}]
      </td>
      <td>{score.mods}</td>
      <td>{Number(score.acc * 100).toFixed(2)}%</td>
      <td>{score.missCount}</td>
      <td>{score.score}</td>
      <td>{score.pp}</td>
      <td onClick={clickPlayer} style={{ cursor: "pointer" }}>
        {score.player.name}
      </td>
    </tr>
  );
}
