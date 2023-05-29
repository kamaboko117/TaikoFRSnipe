import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Snipe } from "../types/api";
import IndexSelector from "../components/IndexSelector/IndexSelector";
import SnipeList from "../components/Snipes/SnipeList";
import Sort from "../components/IndexSelector/Sort";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Snipes() {
  const [snipes, setSnipes] = useState([] as Snipe[]);
  const [index, setIndex] = useState(0);
  const [sort, setSort] = useState("DESC");
  const limit = 20;
  useEffect(() => {
    fetch(
      `${REACT_APP_API_URL}/snipes/latest?offset=${
        index * limit
      }&limit=${limit}&order=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
      });
  }, [index, sort]);

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h1>Top Scores</h1>
        <Sort by={sort} setSort={setSort} />
        <IndexSelector setIndex={setIndex} index={index} />
        <SnipeList snipes={snipes} />
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
