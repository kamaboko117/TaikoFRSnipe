import React from "react";
import { Snipe } from "../../types/api";
import { useNavigate } from "react-router-dom";

export default function SnipeHistory({ snipe }: { snipe: Snipe }) {
  const verbList = [
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
  const navigate = useNavigate()
  const clickSniper = () => {
    navigate(`/Player/${snipe.sniper.id}`)
  }
  const clickVictim = () => {
    navigate(`/Player/${snipe.victim?.id}`)
  }
  if (snipe.victim) {
    return (
      <div>
        <span className="snipe-timestamp">
          {" "}
          {new Date(snipe.timestamp).toLocaleString()}{" "}
        </span>
        <span className="sniper-name" onClick={clickSniper}> {snipe.sniper.name} </span>
        <span className="snipe-verb">
          {verbList[Math.floor(Math.random() * verbList.length)]}
        </span>
        <span> </span>
        <span className="victim-name" onClick={clickVictim}>
          {snipe.victim.id === snipe.sniper.id
            ? "themselves"
            : snipe.victim.name}
        </span>
      </div>
    );
  }
  return (
    <div>
      <span className="snipe-timestamp">
          {" "}
          {new Date(snipe.timestamp).toLocaleString()}{" "}
        </span>
      <span className="sniper-name" onClick={clickSniper}>{snipe.sniper.name}</span>
      <span className="snipe-verb"> claimed first place</span>
    </div>
  );
}
