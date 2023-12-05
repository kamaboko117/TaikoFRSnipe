import React from "react";
import { ReactComponent as Arrow } from "../../assets/left-arrow.svg";

export default function IndexSelector({ setIndex, index }: any) {
  return (
    <div className="index-selector">
      <Arrow
        className="index-selector-arrow"
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      />
      <span>{index + 1}</span>
      <Arrow
        className="index-selector-arrow index-selector-arrow-right"
        onClick={() => {
          setIndex(index + 1);
        }}
      />
    </div>
  );
}
