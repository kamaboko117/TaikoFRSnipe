import React, { useEffect, useState } from "react";
import { Player } from "../types/api";
import PlayerList from "../components/Players/PlayerList";
import IndexSelector from "../components/IndexSelector/IndexSelector";
import Sort from "../components/IndexSelector/Sort";
import { SortObject } from "../types/other";
import PlayersNav from "../components/Navbar/PlayersNav";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export default function Players() {
  const [index, setIndex] = useState(0);
  const limit = 40;
  const [players, setPlayers] = useState([] as Player[]);
  const [order, setOrder] = useState("DESC");
  const sort: SortObject = {
    name: "#1FR Count",
    string: "",
  };
  const sorts = [sort];

  useEffect(() => {
    fetch(
      `${REACT_APP_API_URL}/players/top?offset=${
        index * limit
      }&limit=${limit}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPlayers(data);
        }
      });
  }, [index, order]);

  return (
    <div>
      <div className="wrapper">
        <PlayersNav />
        <Sort order={order} setOrder={setOrder} sort={sort} sorts={sorts} />
        <IndexSelector setIndex={setIndex} index={index} />
        <PlayerList players={players} index={index} limit={limit} />
        <IndexSelector setIndex={setIndex} index={index} />
      </div>
    </div>
  );
}
