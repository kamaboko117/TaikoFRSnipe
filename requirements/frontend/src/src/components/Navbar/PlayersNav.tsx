import React from "react";
import { NavbarLink } from "./Navbar";

export default function PlayersNav() {
  return (
    <div className="navbar_2 navbar">
      <NavbarLink dest="/Players/Top">Top Players</NavbarLink>
      <NavbarLink dest="/Players/HallOfFame">Hall of Fame</NavbarLink>
    </div>
  );
}
