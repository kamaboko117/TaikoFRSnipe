import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  // button click handler
  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <form onSubmit={searchHandler} className="search-bar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
