import React from "react";
import { Beatmap } from "../../types/api";
import BeatmapDifficultiesRow from "./BeatmapDifficultiesRow";

export default function BeatmapItemFull(props: { beatmap: Beatmap }) {
  const handleClick = () => {
    window.open(`https://osu.ppy.sh/beatmaps/${props.beatmap.id}`)
  };

  return (
    <div>
      <div className="beatmap-card" onClick={handleClick}>
        <img
          src={`https://assets.ppy.sh/beatmaps/${props.beatmap.mapset.id}/covers/cover.jpg`}
          alt="cover"
        />
        <div className="beatmap-card-info">
          <h1 className="beatmap-title">
            {props.beatmap.artist} - {props.beatmap.song} [
            {props.beatmap.difficulty}]
          </h1>
          <BeatmapDifficultiesRow
            mapset={props.beatmap.mapset}
            currentDifficulty={props.beatmap.sr}
          />
        </div>
        <h2 className="beatmap-mapper">Mapset by {props.beatmap.mapper}</h2>
      </div>
    </div>
  );
}
