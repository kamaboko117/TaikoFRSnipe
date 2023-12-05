import React from "react";

export const Snow = () => {
  let snowflakes = [];
  for (let i = 0; i < 200; i++) {
    snowflakes.push(<div className="snowflake" key={i}></div>);
  }
  return <div className="snowWrapper">{snowflakes}</div>;
};
