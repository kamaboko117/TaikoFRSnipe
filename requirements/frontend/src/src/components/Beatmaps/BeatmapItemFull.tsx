import React from "react";
import { Beatmap } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function BeatmapItemFull(props: { beatmap: Beatmap }) {
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href = `https://osu.ppy.sh/beatmaps/${props.beatmap.id}`;
  };
  const clickPlayer = () => {
    navigate(`/Player/${props.beatmap.topPlayer.id}`);
  };

  return (
    <div>
      <div className="beatmap-card" onClick={handleClick}>
        <img
          src={`https://assets.ppy.sh/beatmaps/${props.beatmap.setId}/covers/cover.jpg`}
          alt="cover"
        />
        <h1 className="beatmap-title">
          {props.beatmap.song} - {props.beatmap.artist} [
          {props.beatmap.difficulty}]
        </h1>
        <h2 className="beatmap-mapper">Mapset by {props.beatmap.mapper}</h2>
      </div>
      <div>
        <h1>Current Top FR</h1>
        {props.beatmap.topPlayer ? (
          <h2 onClick={clickPlayer} style={{ cursor: "pointer" }}>
            {props.beatmap.topPlayer.name}
          </h2>
        ) : (
          <h2>None</h2>
        )}
      </div>
    </div>
  );
}
