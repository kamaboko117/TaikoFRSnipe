import React from "react";
import { Snipe } from "../../types/api";
import SnipeFeedItem from "./SnipeFeedItem";

export default function SnipeHistory({
  snipes,
  verbose = false,
}: {
  snipes: Snipe[];
  verbose?: boolean;
}) {
  return (
    <div>
      {snipes
        .sort((a, b) =>
          a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
        )
        .map((snipe) => (
          <SnipeFeedItem snipe={snipe} key={snipe.id} verbose={verbose} />
        ))}
    </div>
  );
}
