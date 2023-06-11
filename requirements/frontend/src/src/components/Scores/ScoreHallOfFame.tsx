import React from "react";
import { Score } from "../../types/api";

export default function ScoreHallOfFame({
  score,
  description,
  children,
}: {
  score: Score;
  description: string;
  children: any;
}) {
  return (
    <div className="hof-element">
      {children}
      <div className="hof-card">
        <img
          className="hof-card_avatar"
          src={`https://a.ppy.sh/${score.beatmap.topPlayer.id}`}
          alt={score.beatmap.topPlayer.name}
        />
        <div className="hof-card_content">
          <p className="player-name">{score.beatmap.topPlayer.name}</p>
          <p>{description}</p>
          <p>
            {score.beatmap.artist} - {score.beatmap.song}
          </p>
        </div>
      </div>
    </div>
  );
}
