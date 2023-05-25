import React from "react";
import { Beatmap } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function BeatmapItem(props: { beatmap: Beatmap }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/Beatmap/${props.beatmap.id}`);
  };

  return (
    <div className="beatmap-item" onClick={handleClick}>
      <div className="beatmap-thumbnail">
        <img
          src={`https://assets.ppy.sh/beatmaps/${props.beatmap.setId}/covers/cover.jpg`}
          alt="cover"
        />
        <h1 className="beatmap-title">
          {props.beatmap.artist} - {props.beatmap.song}
        </h1>
        <h2 className="beatmap-difficulty">{props.beatmap.difficulty}</h2>
      </div>
    </div>
  );
}
