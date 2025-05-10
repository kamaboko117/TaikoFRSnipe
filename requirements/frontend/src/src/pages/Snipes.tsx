import React, { useEffect, useState } from "react";
import { Snipe } from "../types/api";
import IndexSelector from "../components/IndexSelector/IndexSelector";
import SnipeList from "../components/Snipes/SnipeList";
import { SortObject } from "../types/other";
import Sort from "../components/IndexSelector/Sort";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Snipes() {
  const [snipes, setSnipes] = useState([] as Snipe[]);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState("DESC" as "DESC" | "ASC");
  const [victimless, setVictimless] = useState(false);
  const limit = 20;
  const sort: SortObject = {
    name: "Date",
    string: "date",
  };
  const sorts = [sort];

  useEffect(() => {
    fetch(
      `${REACT_APP_API_URL}/snipes/latest?offset=${
        index * limit
      }&limit=${limit}&order=${order}&victimless=${victimless}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setSnipes(data);
        }
      });
  }, [index, order, victimless]);

  return (
    <div>
      <div className="wrapper">
        <h1>Snipes</h1>
        <div className="snipe-header">
          <Sort order={order} setOrder={setOrder} sorts={sorts} sort={sort} />

          <button
            className={victimless ? "toggled" : ""}
            onClick={() => setVictimless(!victimless)}
          >
            With Victims Only
          </button>
        </div>
        <IndexSelector setIndex={setIndex} index={index} />
        <SnipeList snipes={snipes} />
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
