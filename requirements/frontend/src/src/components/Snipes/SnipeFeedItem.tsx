import React from "react";
import { Snipe } from "../../types/api";
import { useNavigate } from "react-router-dom";

export const verbList = [
  "sniped",
  "destroyed",
  "annihilated",
  "rekt",
  "destroyed",
  "obliterated",
  "murdered",
  "killed",
  "shot",
  "assassinated",
  "executed",
  "terminated",
  "slaughtered",
  "butchered",
  "massacred",
  "wasted",
  "wrecked",
  "ended",
];

export default function SnipeFeedItem({
  snipe,
  verbose = false,
}: {
  snipe: Snipe;
  verbose?: boolean;
}) {
  const navigate = useNavigate();
  const clickSniper = () => {
    navigate(`/Player/${snipe.sniper.id}`);
  };
  const auxClickSniper = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/Player/${snipe.sniper.id}`);
    }
  };
  const clickVictim = () => {
    navigate(`/Player/${snipe.victim?.id}`);
  };
  const auxClickVictim = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/Player/${snipe.victim?.id}`);
    }
  };
  const clickMap = () => {
    navigate(`/Beatmap/${snipe.beatmap.id}`);
  };
  const auxClickMap = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (e.button === 1) {
      window.open(`/Beatmap/${snipe.beatmap.id}`);
    }
  };

  if (snipe.victim) {
    return (
      <div>
        <span className="snipe-timestamp">
          {" "}
          {new Date(snipe.timestamp).toLocaleString()}{" "}
        </span>
        <span
          className="sniper-name"
          onClick={clickSniper}
          onMouseDown={auxClickSniper}
        >
          {" "}
          {snipe.sniper.name}{" "}
        </span>
        <span className="snipe-verb">
          {verbList[Math.floor(Math.random() * verbList.length)]}
        </span>
        <span> </span>
        <span
          className="victim-name"
          onClick={clickVictim}
          onMouseDown={auxClickVictim}
        >
          {snipe.victim.id === snipe.sniper.id
            ? "themselves"
            : snipe.victim.name}
        </span>
        {verbose ? (
          <span>
            {" "}
            on{" "}
            <span
              className="snipe-map"
              onClick={clickMap}
              onMouseDown={auxClickMap}
            >
              {snipe.beatmap?.artist} - {snipe.beatmap?.song}
            </span>
          </span>
        ) : (
          ""
        )}
      </div>
    );
  }
  return (
    <div>
      <span className="snipe-timestamp">
        {" "}
        {new Date(snipe.timestamp).toLocaleString()}{" "}
      </span>
      <span
        className="sniper-name"
        onClick={clickSniper}
        onMouseDown={auxClickSniper}
      >
        {snipe.sniper.name}
      </span>
      <span className="snipe-verb"> claimed first place</span>
      {verbose ? (
        <span>
          {" "}
          on{" "}
          <span
            className="snipe-map"
            onClick={clickMap}
            onMouseDown={auxClickMap}
          >
            {snipe.beatmap?.artist} - {snipe.beatmap?.song}
          </span>
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
