import React from "react";
import logo from "../logo.svg";
import Navbar from "../components/Navbar";

export default function Scores() {
  return (
    <div>
      <Navbar />
      <header className="App-header">
        <h1>Scores</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}
