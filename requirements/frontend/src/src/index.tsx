// index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; // L'importation de App, puisque c'est un export par défaut
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
