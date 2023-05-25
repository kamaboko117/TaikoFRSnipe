import React from "react";
import { Beatmap } from "../../types/api";

export default function BeatmapItemFull(props: { beatmap: Beatmap }) {
  return (
    <div>
      <div className="beatmapCard">
        <h1>
          {props.beatmap.song} - {props.beatmap.artist} [
          {props.beatmap.difficulty}]
        </h1>
        <h2>Mapset by {props.beatmap.mapper}</h2>
      </div>
      <div>
        <h1>Current Top FR</h1>
        <h2>{props.beatmap.topPlayer.name}</h2>
      </div>
    </div>
  );
}
