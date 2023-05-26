import React from "react";
import { Mapset } from "../../types/api";
import BeatmapDifficulty from "./BeatmapDifficulty";

export default function BeatmapDifficultiesRow(props: {
  mapset: Mapset;
  currentDifficulty?: number;
}) {
  console.log(props.currentDifficulty);
  return (
    <div className="beatmap-difficulties-row">
      {props.mapset.beatmaps.map((difficulty) => (
        <BeatmapDifficulty
          beatmap={difficulty}
          selected={props.currentDifficulty === difficulty.sr}
          key={difficulty.id}
        />
      ))}
    </div>
  );
}
