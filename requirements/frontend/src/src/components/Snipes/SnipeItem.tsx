import React from "react";
import { Snipe } from "../../types/api";
import BeatmapItem from "../Beatmaps/BeatmapItem";

export default function SnipeItem({ snipe }: { snipe: Snipe }) {
  return (
    <div className="snipe-item">
      <BeatmapItem beatmap={snipe.beatmap} />
      <span className="beatmap-snipe">
        {snipe.sniper.name}
        {snipe.victim ? `sniped ${snipe.victim.name}` : " claimed 1st place"}
      </span>
    </div>
  );
}
