import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "../../assets/taikoFRSnipe.png";
import SearchBar from "./SearchBar";

interface NavbarLinkProps {
  dest: string;
  children: any;
}

function NavbarLink({ dest, children }: NavbarLinkProps) {
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
        <img src={logo} className="App-logo" alt="logo" />
        <NavbarLink dest="/">Home</NavbarLink>
        <NavbarLink dest="/Scores">Scores</NavbarLink>
        <NavbarLink dest="/Players">Players</NavbarLink>
      </nav>
      <div className="navbar-right">
        <SearchBar />
      </div>
    </header>
  );
}
