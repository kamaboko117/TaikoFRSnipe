import React from "react";
import { Beatmap, Score } from "../../types/api";
import { getTimeSinceDate } from "../../utils";

export default function ScoreDetail({
  score,
  beatmap,
  clickPlayer,
}: {
  score: Score | null;
  beatmap: Beatmap;
  clickPlayer: () => void;
}) {
  const player = beatmap.topPlayer;
  if (!score || !player) {
    return (
      <div>No scores for this beatmap yet. Be the first to submit one!</div>
    );
  }

  return (
    <div>
      <h1>Current Top FR</h1>
      <div className="score-detail">
        <div className="score-detail-player">
          <div className="score-detail-avatar">
            <img
              src={`https://a.ppy.sh/${player.id}`}
              alt="profile"
            />
          </div>
          <div className="score-detail-player-info">
            <span 
              className="player-name"
              onClick={clickPlayer}
              // style={{ cursor: "pointer", fontSize: "50px", fontWeight: "750" }}
            >
              {beatmap.topPlayer.name}
            </span>
            <br />
            <span>Achieved {getTimeSinceDate(new Date(score.date))} ago</span>
          </div>
        </div>
        <div className="score-detail-score">
          <div>{score?.score} Score</div>
          <div>{score ? `${(score.acc * 100).toFixed(2)}%` : ""}</div>
          <div>{score?.maxCombo}x Combo</div>
          <div>{score?.mods.length ? score?.mods : "No Mods"}</div>
          <div>{score?.pp} PP</div>
        </div>
      </div>
    </div>
  );
}
