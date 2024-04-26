import React from "react";
import { Score } from "../../types/api";
import ScoreItem from "./ScoreItem";

export default function ScoreList({ scores, index, limit }: { scores: Score[], index: number, limit: number }) {
  let i = 1;
  return (
    <table>
      <thead>
        <tr>
          <td style={{width:"3.5rem"}}></td>
          <td style={{width:"50%"}}></td>
          <td className="secondary-td">Mods</td>
          <td className="secondary-td">Acc</td>
          <td className="secondary-td">Misses</td>
          <td className="secondary-td">Score</td>
          <td className="secondary-td">PP</td>
          <td style={{width:"8rem"}}>Player</td>
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
