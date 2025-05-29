import React, { useEffect, useState } from "react";
import PlayersNav from "../components/Navbar/PlayersNav";
import { Score, hof } from "../types/api";
import PlayerHallOfFame from "../components/Players/PlayerHallOfFame";
import ScoreHallOfFame from "../components/Scores/ScoreHallOfFame";

function getHHMMSS(seconds: number) {
  const sec_num = parseInt(seconds.toString(), 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const sec = sec_num - hours * 3600 - minutes * 60;

  return `${
    hours ? `${hours} hours ` : ""
  }${minutes} minutes and ${sec} seconds`;
}

function countModPlays(scores: Score[], mod: string) {
  return scores.filter((score) => score.mods.includes(mod)).length;
}

export default function HallOfFame() {
  const [hof, setHof] = useState(null as hof | null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/players/hof`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHof(data);
      });
  }, []);

  if (!hof) {
    return (
      <div className="wrapper">
        <PlayersNav />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="wrapper">
        <PlayersNav />
        <div className="hof-container">
          <PlayerHallOfFame
            player={hof.FLModLover}
            description={`Needs therapy after getting ${countModPlays(
              hof.FLModLover.scores,
              "FL"
            )} Number of top FR score with FL`}
          >
            FL LOVER
          </PlayerHallOfFame>
          <ScoreHallOfFame
            score={hof.OldestScore}
            description={`Their top FR remains uncontested since ${new Date(
              hof.OldestScore.date
            ).toLocaleDateString()}`}
          >
            OLDEST CHAD
          </ScoreHallOfFame>
          <ScoreHallOfFame
            score={hof.lessAcc}
            description={`Thought they were playing Geometry Dash and got a top FR with ${Number(
              hof.lessAcc.acc
            ).toFixed(2)}% Accuracy`}
          >
            I CAN'T READ
          </ScoreHallOfFame>
          <ScoreHallOfFame
            score={hof.mostMisses}
            description={`Probably went afk mid-play to get a top FR with ${hof.mostMisses.missCount} misses`}
          >
            MISS FRANCE
          </ScoreHallOfFame>
          <ScoreHallOfFame
            score={hof.longestPlay}
            description={`Played for a whopping ${getHHMMSS(
              hof.longestPlay.beatmap.drain
            )} to get a top FR`}
          >
            SLEEPWALKER
          </ScoreHallOfFame>
          <ScoreHallOfFame
            score={hof.highestPPPlay}
            description={`Got the most PP out of a top FR with ${hof.highestPPPlay.pp}PP`}
          >
            THE GOAT
          </ScoreHallOfFame>
        </div>
      </div>
    </div>
  );
}
