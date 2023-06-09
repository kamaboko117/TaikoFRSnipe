import React from "react";
import Navbar from "../components/Navbar/Navbar";
import donchan from "../assets/donchan.png";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>About</h1>
        <span>
          This website is a tool to track the best french scores for each map in
          osu!taiko. This is because osu! allows you to track your global #1s
          but not your national #1s. This project is heavily inspired by the{" "}
          <a href="https://snipe.nz/">snipe.nz</a> project. If you have any
          suggestions, feel free to contact me on my Discord{" "}
          <a href="https://discord.gg/Fu9PTJ4">server</a> or by any other means.
        </span>
        <h2>How does it work?</h2>
        <span>
          The website checks each map manually for new scores and updates it if
          a better score is found. updating every map in the database takes up
          to 24 hours. after clearing the list we add the latest maps to the
          list and we start again. If you want to update a score faster, you can
          use the manual updater on the homepage, or go to the beatmap page and
          click on the refresh button.
        </span>
        <h2>Who made this?</h2>
        <span>
          I'm kamaboko117, a French osu!taiko player. I wanted to make a website
          that would be useful to the osu!taiko community. I also wanted to make
          the map leaderboards more competitive and give some incentive for
          going for French #1s. I hope you enjoy using it.
        </span>
        <h2>Special thanks</h2>
        <span>
          Thanks to <a href="https://github.com/nzbasic">nzbasic</a> for the
          code of the original snipe.nz website.
        </span>
        <br />
        <span>
          Thanks to <a href="https://github.com/Issuko-Adam">Issuko</a> for
          their CSS insights and their HTML Masterclasses, I wouldn't be alive
          if it wasn't for them. Issuko saved my life and the osu!taiko
          community.
        </span>
        <br />
        <span>
          thanks <a href="https://github.com/YaniFR">YaniFR</a> for (?) and for
          being a good friend
        </span>
        <br />
        <span>
          Big thanks to my brother ChatGPT and my sister Copilot for litterally
          making this website.
        </span>
        <br />
        <div className="center">
          <img src={donchan} />
        </div>
      </div>
    </div>
  );
}
