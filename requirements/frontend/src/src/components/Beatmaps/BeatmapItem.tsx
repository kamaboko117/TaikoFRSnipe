import React from "react";
import { Beatmap } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function BeatmapItem(props: { beatmap: Beatmap }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/Beatmap/${props.beatmap.id}`);
  };
  const onAuxClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/Beatmap/${props.beatmap.id}`);
    }
  };

  return (
    <div
      className="beatmap-item"
      onClick={handleClick}
      onMouseDown={onAuxClick}
    >
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
    </div>
  );
}
