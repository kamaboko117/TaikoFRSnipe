import React from "react";
import { Score } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function ScoreItem({ score }: { score: Score }) {
  const navigate = useNavigate();
  const clickPlayer = () => {
    navigate(`/player/${score.player.id}`);
  };
  const clickBeatmap = () => {
    navigate(`/beatmap/${score.beatmap.id}`);
  };
  return (
    <tr>
      <td onClick={clickBeatmap} style={{ cursor: "pointer" }}>
        {score.beatmap.artist} - {score.beatmap.song} [
        {score.beatmap.difficulty}]
      </td>
      <td>{score.mods}</td>
      <td>{Number(score.acc).toFixed(2)}%</td>
      <td>{score.missCount}</td>
      <td>{score.score}</td>
      <td>{score.pp}</td>
      <td onClick={clickPlayer} style={{ cursor: "pointer" }}>
        {score.player.name}
      </td>
    </tr>
  );
}
