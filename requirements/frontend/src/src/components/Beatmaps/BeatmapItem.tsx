import React from "react";
import { Beatmap } from "../../types/api";

export default function BeatmapItem(props: { beatmap: Beatmap }) {
  return (
    <div>
      <h1>{props.beatmap.song} - {props.beatmap.artist}</h1>
      <h2>{props.beatmap.difficulty}</h2>
    </div>
  );
}