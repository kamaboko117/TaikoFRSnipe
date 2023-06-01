import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { Player, Score, Snipe } from "../types/api";
import IndexSelector from "../components/IndexSelector/IndexSelector";
import Sort from "../components/IndexSelector/Sort";
import { SortObject } from "../types/other";
import PlayerScoreList from "../components/Scores/PlayerScoreList";
import SnipeHistory from "../components/Snipes/SnipeHistory";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const sorts = [
  { name: "PP", string: "pp" },
  { name: "Accuracy", string: "acc" },
  { name: "Score", string: "score" },
  { name: "Combo", string: "maxCombo" },
  { name: "Misses", string: "missCount" },
  // { name: "Mods", string: "mods" },
  // { name: "300s", string: "count300" },
  // { name: "100s", string: "count100" },
  // { name: "50s", string: "count50" },
  // { name: "Katus", string: "countkatu" },
  // { name: "Gekis", string: "countgeki" },
  // { name: "Max Combo", string: "maxcombo" },
  { name: "Date", string: "date" },
];

export default function PlayerPage() {
  const id = parseInt(useParams().id as string);
  const [snipes, setSnipes] = useState([] as Snipe[]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [scores, setScores] = useState([] as Score[]);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState("DESC" as "DESC" | "ASC");
  const [sort, setSort] = useState({
    name: "PP",
    string: "pp",
  } as SortObject);
  const limit = 10;

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/players/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayer(data);
        }
      });
  }, [id]);
  useEffect(() => {
    fetch(
      `${REACT_APP_API_URL}/scores/player/${id}?limit=${limit}&offset=${
        index * limit
      }&order=${order}&sort=${sort.string}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setScores(data);
        }
      });
  }, [id, index, order, sort]);
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/snipes/player/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
      });
  }, [id]);

  const clickPlayer = () => {
    window.open(`https://osu.ppy.sh/users/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <div className="user-profile-header" onClick={clickPlayer}>
          <div className="user-profile-avatar">
            <img
              src={`https://a.ppy.sh/${player?.id}`}
              alt="avatar"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
          <div className="user-profile-header-info">
            <h1>{player?.name}</h1>
            <h2>Top FR Count: {player?.topFRCount}</h2>
          </div>
        </div>
        <h1>Top FRs</h1>
        <Sort
          order={order}
          setOrder={setOrder}
          sort={sort}
          setSort={setSort}
          sorts={sorts}
        />
        <IndexSelector index={index} setIndex={setIndex} />
        <PlayerScoreList
          scores={scores}
          index={index}
          limit={limit}
          sortColumn={sort}
        />
        <IndexSelector index={index} setIndex={setIndex} />
        <h1>Activity</h1>
        <SnipeHistory snipes={snipes} verbose={true} />
      </div>
    </div>
  );
}
