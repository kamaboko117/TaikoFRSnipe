import React from "react";
import { Beatmap, Score } from "../../types/api";

const getTimeSinceDate = (date: Date) => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}}`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"}`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"}`;
  }
  const years = Math.floor(months / 12);
  return `${years} ${years === 1 ? "year" : "years"}`;
};

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
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div className="score-detail-player-info">
            <span
              onClick={clickPlayer}
              style={{ cursor: "pointer", fontSize: "50px", fontWeight: "750" }}
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
