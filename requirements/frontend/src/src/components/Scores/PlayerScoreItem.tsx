import React from "react";
import { Score } from "../../types/api";
import { useNavigate } from "react-router-dom";
import { SortObject } from "../../types/other";
import { getTimeSinceDate } from "../../utils";

export default function ScoreItem({
  score,
  rank,
  sortColumn,
}: {
  score: Score;
  rank: number;
  sortColumn: SortObject;
}) {
  const navigate = useNavigate();
  const clickBeatmap = () => {
    navigate(`/beatmap/${score.beatmap.id}`);
  };
  const sortColumnValue = () => {
    switch (sortColumn.name) {
      case "Accuracy":
        return (score.acc * 100).toFixed(2) + "%";
      case "Misses":
        return score.missCount;
      case "Score":
        return score.score;
      case "Combo":
        return score.maxCombo;
      case "PP":
        return score.pp;
      case "Date":
        return `${getTimeSinceDate(new Date(score.date))} ago`;
      default:
        return "";
    }
  };
  return (
    <tr className="table-row">
      <td style={{ fontWeight: "800" }}>#{rank}</td>
      <td onClick={clickBeatmap} style={{ cursor: "pointer" }}>
        {score.beatmap.artist} - {score.beatmap.song} [
        {score.beatmap.difficulty}]
      </td>
      <td>{score.mods}</td>
      {sortColumn.name !== "Accuracy" ? (
        <td>{Number(score.acc * 100).toFixed(2)}%</td>
      ) : null}
      {sortColumn.name !== "Misses" ? <td>{score.missCount}</td> : null}
      {sortColumn.name !== "Score" ? <td>{score.score}</td> : null}
      <td>{sortColumnValue()}</td>
    </tr>
  );
}
