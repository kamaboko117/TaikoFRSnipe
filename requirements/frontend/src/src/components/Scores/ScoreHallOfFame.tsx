import React from "react";
import { Score } from "../../types/api";
import { Link } from "react-router-dom";

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
      <Link className="hof-card" to={`/Player/${score.beatmap.topPlayer.id}`}>
        <img
          className="hof-card_avatar"
          src={`https://a.ppy.sh/${score.beatmap.topPlayer.id}`}
          alt={score.beatmap.topPlayer.name}
        />
        <div className="hof-card_content">
          <p className="player-name">{score.beatmap.topPlayer.name}</p>
          <p>{description}</p>
          <Link className="map-name" to={`/Beatmap/${score.beatmap.id}`}>
            {score.beatmap.artist} - {score.beatmap.song} [{score.beatmap.difficulty}]
          </Link>
        </div>
      </Link>
    </div>
  );
}
