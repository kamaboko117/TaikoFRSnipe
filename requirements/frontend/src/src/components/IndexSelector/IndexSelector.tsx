import React from "react";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";

const RightArrow = (props: any) => {
  return (
    <LeftArrow
      onClick={props.onClick}
      style={{ transform: "rotate(180deg)", cursor: "pointer" }}
    />
  );
};

export default function IndexSelector({ setIndex, index }: any) {
  return (
    <div className="index-selector">
      <LeftArrow
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      />
      <span>{`   ${index + 1}   `}</span>
      <RightArrow
        onClick={() => {
          setIndex(index + 1);
        }}
      />
    </div>
  );
}
