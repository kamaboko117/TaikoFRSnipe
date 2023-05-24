import React from "react";
import { Beatmap } from "../../types/api";
import BeatmapItem from "./BeatmapItem";

export default function BeatmapList(props: { beatmaps: Beatmap[] }) {
  return (
    <div>
      {props.beatmaps.map((beatmap) => (
        <BeatmapItem beatmap={beatmap} />
      ))}
    </div>
  );
}