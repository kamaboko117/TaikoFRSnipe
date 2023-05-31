import React from "react";
import { SortObject } from "../../types/other";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export default function Sort({
  sort = {} as SortObject,
  setSort = () => {},
  sorts = [],
  order,
  setOrder,
}: {
  sort?: SortObject;
  setSort?: (sort: SortObject) => void;
  sorts?: SortObject[];
  order: string;
  setOrder: (order: "DESC" | "ASC") => void;
}) {
  return (
    <div className="sort-selector">
      <span>Sort by:</span>
      {sorts.map((sortItem) => (
        <button
          key={sortItem.name}
          className={sortItem === sort ? "active" : ""}
          onClick={() => {
            sortItem === sort
              ? setOrder(order === "DESC" ? "ASC" : "DESC")
              : setSort(sortItem);
          }}
        >
          {sortItem.name}{" "}
          {sortItem === sort ? (
            <FontAwesomeIcon
              icon={order === "DESC" ? faCaretDown : faCaretUp}
            />
          ) : (
            ""
          )}
        </button>
      ))}
    </div>
  );
}
