import { Link, useMatch, useResolvedPath } from "react-router-dom";

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
    <nav className="navbar">
      <NavbarLink dest="/">Home</NavbarLink>
      <NavbarLink dest="/Scores">Scores</NavbarLink>
    </nav>
  );
}
