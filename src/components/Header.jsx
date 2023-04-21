import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";


function Header() {
  const {theme} = useContext(ThemeContext)

  return (
    <header className="header "><Link to="/" onClick={() => {
    }}>
      <h1 className={"header-text " + theme}>THE NEWS</h1>
    </Link></header>
  );
}

export default Header;
