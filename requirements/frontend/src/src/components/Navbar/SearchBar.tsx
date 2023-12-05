import React, { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // button click handler
  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    navigate(`/search/${search}`);
  };

  return (
    <input
      className="search-bar__input"
      name="search"
      type="text"
      placeholder="Search"
      onChange={(e) => setSearch(e.currentTarget.value)}
      onKeyDown={searchHandler}
    />
  );
}
