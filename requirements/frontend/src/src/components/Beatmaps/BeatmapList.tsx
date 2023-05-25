import React from "react";
import { Beatmap } from "../../types/api";
import BeatmapItem from "./BeatmapItem";

export default function BeatmapList(props: { beatmaps: Beatmap[] }) {
  return (
    <div className="beatmap-list">
      {props.beatmaps.map((beatmap) => (
        <BeatmapItem beatmap={beatmap} key={beatmap.id} />
      ))}
    </div>
  );
}
