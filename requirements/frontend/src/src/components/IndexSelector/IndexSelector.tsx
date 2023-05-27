import React from "react";

export default function IndexSelector({ setIndex, index }: any) {
  return (
    <div className="index-selector">
      <button
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        {" "}
        Previous{" "}
      </button>
      <span>{index + 1}</span>
      <button
        onClick={() => {
          setIndex(index + 1);
        }}
      >
        {" "}
        Next{" "}
      </button>
    </div>
  );
}
