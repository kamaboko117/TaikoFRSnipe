import React from "react";
import { Snipe } from "../../types/api";
import SnipeFeedItem from "./SnipeFeedItem";

export default function SnipeHistory({ snipes }: { snipes: Snipe[] }) {
  return (
    <div>
      <h1>Snipe History</h1>
      {snipes
        .sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
        )
        .map((snipe) => (
          <SnipeFeedItem snipe={snipe} key={snipe.id} />
        ))}
    </div>
  );
}
