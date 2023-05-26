import React from "react";
import { Beatmap } from "../../types/api";
import { ReactComponent as TaikoIcon } from "../../taikoIcon.svg";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom";

export default function BeatmapDifficulty(props: {
  beatmap: Beatmap;
  selected?: boolean;
}) {
  let navigate = useNavigate();
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    navigate(`/Beatmap/${props.beatmap.id}`);
  };
  // color is mapped to a spectrum of colors based on difficulty, it evolves linearly
  const difficultyColourSpectrum = d3
    .scaleLinear<string>()
    .domain([1.5, 2, 2.5, 3.25, 4.5, 6, 7, 8])
    .clamp(true)
    .range([
      "#4FC0FF",
      "#4FFFD5",
      "#7CFF4F",
      "#F6F05C",
      "#FF8068",
      "#FF3C71",
      "#6563DE",
      "#18158E",
    ])
    .interpolate(d3.interpolateRgb.gamma(2.2));

  function getDiffColor(rating: number) {
    return rating >= 8 ? "#000000" : difficultyColourSpectrum(rating);
  }

  console.log(props.selected);
  return (
    <div className="beatmap-difficulty-item" onClick={handleClick}>
      <div
        className={
          props.selected
            ? "beatmap-difficulty-icon beatmap-difficulty-selected"
            : "beatmap-difficulty-icon"
        }
        style={{ color: getDiffColor(props.beatmap.sr) }}
      >
        <TaikoIcon />
      </div>
    </div>
  );
}
