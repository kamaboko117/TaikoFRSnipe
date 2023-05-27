import React from "react";
import { Snipe } from "../../types/api";
import BeatmapItem from "../Beatmaps/BeatmapItem";

export default function SnipeItem({ snipe }: { snipe: Snipe }) {
  return (
    <div className="snipe-item">
      <BeatmapItem beatmap={snipe.beatmap} />
      <div className="beatmap-snipe">
        <span className="beatmap-sniper">
          {snipe.sniper.name}
        </span>
        {snipe.victim ? (
          <>
          <span> sniped </span>
          <span className="beatmap-victim">{snipe.victim.name}</span>
          </>
        ) : (
          <span> claimed 1st place</span>
        )}
        <br />
        <span className="beatmap-snipe-date">
          {/*calculates how long ago*/
            Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60 / 60 / 24) > 0
            ? Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60 / 60 / 24) + " days"
            : Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60 / 60) > 0
            ? Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60 / 60) + " hours"
            : Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60) > 0
            ? Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000 / 60) + " minutes"
            : Math.floor((Date.now() - Date.parse(snipe.timestamp.toString())) / 1000) + " seconds"
            } ago
        </span>
      </div>
    </div>
  );
}
