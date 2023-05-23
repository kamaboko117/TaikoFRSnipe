import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <header className="App-header">
                <h1>Home</h1>
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </div>
          }
        />
        <Route
          path="/Scores"
          element={
            <div>
              <Navbar />
              <header className="App-header">
                <h1>Scores</h1>
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
