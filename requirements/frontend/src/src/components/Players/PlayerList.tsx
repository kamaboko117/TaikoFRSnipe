import React from "react";
import { Player } from "../../types/api";
import PlayerItem from "./PlayerItem";

export default function PlayerList({
  players,
  index,
  limit,
}: {
  players: Player[];
  index: number;
  limit: number;
}) {
  let i = 1;
  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td style={{width:"60%"}}>Player</td>
          <td style={{textWrap:"wrap"}}>Top FR Count</td>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <PlayerItem
            player={player}
            key={player.id}
            rank={i++ + index * limit}
          />
        ))}
      </tbody>
    </table>
  );
}
