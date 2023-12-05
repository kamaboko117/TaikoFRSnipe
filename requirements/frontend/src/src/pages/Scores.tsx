import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Score } from "../types/api";
import ScoreList from "../components/Scores/ScoreList";
import IndexSelector from "../components/IndexSelector/IndexSelector";
import Sort from "../components/IndexSelector/Sort";
import { SortObject } from "../types/other";
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
] as SortObject[];
export default function Scores() {
  const [scores, setScores] = useState([] as Score[]);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState("DESC" as "DESC" | "ASC");
  const [sort, setSort] = useState(sorts[0] as SortObject);

  const limit = 40;
  useEffect(() => {
    fetch(
      `${REACT_APP_API_URL}/scores/top?offset=${
        index * limit
      }&limit=${limit}&order=${order}&sort=${sort.string}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setScores(data);
        }
      });
  }, [index, order, sort]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Top Scores</h1>
        <Sort
          order={order}
          setOrder={setOrder}
          sort={sort}
          setSort={setSort}
          sorts={sorts}
        />
        <IndexSelector setIndex={setIndex} index={index} />
        <ScoreList scores={scores} index={index} limit={limit} />
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
