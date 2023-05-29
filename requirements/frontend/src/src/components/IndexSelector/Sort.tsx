import React from "react";

export default function Sort({
  by,
  setSort,
}: {
  by: string;
  setSort: (sort: string) => void;
}) {
  return (
    <div className="sort">
      <span>Sort by:</span>
      <button
        className={by === "DESC" ? "active" : ""}
        onClick={() => {
          setSort(by === "DESC" ? "ASC" : "DESC");
        }}
      >Reverse Sort</button>
    </div>
  );
}
