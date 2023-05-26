import React from "react";
import { Snipe } from "../../types/api";

export default function SnipeItem(snipe: Snipe) {
  return (
  <div>
    <h1>Sniper: {snipe.sniperId}</h1>
  </div>);
}