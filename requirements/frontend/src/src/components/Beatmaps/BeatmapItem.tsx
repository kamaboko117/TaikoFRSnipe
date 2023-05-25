import React from "react";
import { Beatmap } from "../../types/api";

export default function BeatmapItem(props: { beatmap: Beatmap }) {
  const handleClick = () => {
    window.location.href = `/Beatmap/${props.beatmap.id}`;
  };

  return (
    <div className="beatmap-item" onClick={handleClick}>
      <h1>
        {props.beatmap.song} - {props.beatmap.artist}
      </h1>
      <h2>{props.beatmap.difficulty}</h2>
    </div>
  );
}
