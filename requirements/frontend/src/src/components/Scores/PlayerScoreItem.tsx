import React from "react";
import { Score } from "../../types/api";
import { Link } from "react-router-dom";
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
      case "Star Rating":
        return score.beatmap.sr;
      default:
        return "";
    }
  };
  return (
    <Link className="table-row" to={`/Beatmap/${score.beatmap.id}`}>
      <td style={{ fontWeight: "800" }}>#{rank}</td>
      <td>
        {score.beatmap.artist} - {score.beatmap.song} [
        {score.beatmap.difficulty}]
      </td>
      <td>{score.mods}</td>
      {sortColumn.name !== "Accuracy" ? (
        <td className="secondary-td">{Number(score.acc * 100).toFixed(2)}%</td>
      ) : null}
      {sortColumn.name !== "Misses" ? (
        <td className="secondary-td">{score.missCount}</td>
      ) : null}
      {sortColumn.name !== "Score" ? (
        <td className="secondary-td">{score.score}</td>
      ) : null}
      <td>{sortColumnValue()}</td>
    </Link>
  );
}
