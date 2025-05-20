import React from "react";
import donchan from "../assets/donchan.png";

export default function About() {
  return (
    <div>
      <div className="wrapper">
        <h1>About</h1>
        <span>
          This website is a tool to track the best french scores for each map in
          osu!taiko. [...]
        </span>
        {/* tout le reste ne change pas */}
        <div className="center">
          <img alt="Don-Chan" src={donchan} />
        </div>
      </div>
    </div>
  );
}
