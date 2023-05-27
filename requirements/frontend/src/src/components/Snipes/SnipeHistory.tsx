import React from "react";
import { Snipe } from "../../types/api";
import SnipeFeedItem from "./SnipeFeedItem";

export default function SnipeHistory({ snipes }: { snipes: Snipe[] }) {
  return (
    <div>
      <h1>Snipe History</h1>
      {snipes
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((snipe) => (
          <SnipeFeedItem snipe={snipe} key={snipe.id} />
        ))}
    </div>
  );
}
