import React from "react";
import { Score } from "../../types/api";
import PlayerScoreItem from "./PlayerScoreItem";
import { SortObject } from "../../types/other";

export default function ScoreList({
  scores,
  index,
  limit,
  sortColumn,
}: {
  scores: Score[];
  index: number;
  limit: number;
  sortColumn: SortObject;
}) {
  let i = 1;
  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td style={{ width: "60%" }}></td>
          <td>Mods</td>
          {sortColumn.name !== "Accuracy" ? (
            <td className="secondary-td">Acc</td>
          ) : null}
          {sortColumn.name !== "Misses" ? (
            <td className="secondary-td">Misses</td>
          ) : null}
          {sortColumn.name !== "Score" ? (
            <td className="secondary-td">Score</td>
          ) : null}
          <td>{sortColumn.name}</td>
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <PlayerScoreItem
            score={score}
            key={score.id}
            rank={i++ + index * limit}
            sortColumn={sortColumn}
          />
        ))}
      </tbody>
    </table>
  );
}
