import React from "react";
import { Beatmap } from "../../types/api";
import { Link } from "react-router-dom";

export default function BeatmapItem(props: { beatmap: Beatmap }) {
  return (
    <Link className="beatmap-item" to={`/Beatmap/${props.beatmap.id}`}>
      <div className="beatmap-thumbnail">
        <img
          src={`https://assets.ppy.sh/beatmaps/${props.beatmap.mapset.id}/covers/cover.jpg`}
          alt="cover"
        />
        <span className="beatmap-title">
          {props.beatmap.artist} - {props.beatmap.song}
        </span>
        <span className="beatmap-difficulty">{props.beatmap.difficulty}</span>
      </div>
    </Link>
  );
}
