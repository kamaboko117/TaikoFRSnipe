import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../assets/taikoFRSnipe.png";
import xmaslogo from "../../assets/taikoFRSnipeXMAS.png";
import SearchBar from "./SearchBar";
import { isDecember } from "../../utils";
import "./Navbar.css";
interface NavbarLinkProps {
  dest: string;
  children: any;
}

export function NavbarLink({ dest, children }: NavbarLinkProps) {
  const resolvedPath = useResolvedPath(dest);
  const isActive = useMatch(resolvedPath.pathname);

  return (
    <Link
      to={dest}
      className={isActive ? "navbar-item navbar-item-active" : "navbar-item"}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar-left">
        {isDecember() ? (
          <img src={xmaslogo} alt="Taiko FR Snipe" className="App-logo" />
        ) : (
          <img src={logo} alt="Taiko FR Snipe" className="App-logo" />
        )}
        <NavbarLink dest="/">Home</NavbarLink>
        <NavbarLink dest="/Scores">Scores</NavbarLink>
        <NavbarLink dest="/Players">Players</NavbarLink>
        <NavbarLink dest="/About">About</NavbarLink>
      </nav>
      <div className="navbar-right">
        <SearchBar />
      </div>
    </header>
  );
}
