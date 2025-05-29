import React from "react";
import donchan from "../assets/donchan.png";

export default function About() {
  return (
    <div>
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
          The website checks each map manually for new scores and updates them
          if a better score is found. updating every map in the database takes
          up to 24 hours. after clearing the list we add the latest maps to the
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
          Thanks to Nethen for being a good friend and for being a good friend I
          guess ? I don't know what to say about him but he's a good friend. I
          guess. -Copilot
        </span>
        <br />
        <span>
          Thank you Briesmas for being so beautiful and nice. I love you and I
          will marry you one day.
        </span>
        <br />
        <span>
          Thanks Acii for making an announcement about this website on the
          French osu!taiko Discord server. I don't know how i can thank you
          enough for this. this was the most important thing that happened to me
          in my life. I love you Acii. I will marry you one day.
        </span>
        <br />
        <span>
          Big thanks to my brother ChatGPT and my sister Copilot for litterally
          making this website.
        </span>
        <br />
        <br />
        <span>update: STOP ASKING ME TO ADD YOU TO THE SPECIAL THANKS!</span>
        <br />
        <br />
        <span>
          update: I'm sorry for the last message, I was just a bit mad. I will
          add you to the special thanks if you ask me to. I'm sorry.
        </span>
        <br />
        <br />
        <span>
          Thank you <a href="https://github.com/FelixNIS">Trypha</a> for the
          internship at NIS. I love you.
        </span>
        <br />
        <span>
          Thank you polemik victor for asking me to add you to the special
          thanks. I love you.
        </span>
        <br />
        <h2>Github Repo</h2>
        <span>
          The code for this website is available on{" "}
          <a href="https://github.com/kamaboko117/TaikoFRSnipe">Github</a>. If
          you want to contribute, feel free to make a pull request. If you want
          to report a bug, you can do it on the issues page. You may also
          suggest features there. Making a fork to add your own country
          shouldn't be too hard. Don't be afraid to ask for help.
        </span>
        <div className="center">
          <img alt="Don-Chan" src={donchan} />
        </div>
      </div>
    </div>
  );
}
