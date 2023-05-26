import React from "react";
import { Snipe } from "../../types/api";
import SnipeItem from "./SnipeItem";

interface Props {
  snipes: Snipe[];
}

export default function SnipeList({ snipes }: Props) {
  return (
    <div>
      {snipes.map((snipe) => (
        <SnipeItem snipe={snipe} key={snipe.id} />
      ))}
    </div>
  );
}
