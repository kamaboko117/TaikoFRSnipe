import React from "react";
import { Score } from "../../types/api";
import ScoreItem from "./ScoreItem";

export default function ScoreList({ scores, index, limit }: { scores: Score[], index: number, limit: number }) {
  let i = 1;
  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td>Mods</td>
          <td>Acc</td>
          <td>Misses</td>
          <td>Score</td>
          <td>PP</td>
          <td>Player</td>
        </tr>
      </thead>
      <tbody>
        {scores.map((score) => (
          <ScoreItem score={score} key={score.id} rank={i++ + (index * limit) }/>
        ))}
      </tbody>
    </table>
  );
}
