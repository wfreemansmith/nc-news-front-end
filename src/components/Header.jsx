import { Link } from "react-router-dom";


function Header() {

  return (
    <header className="header"><Link to="/" onClick={() => {
    }}>
      <h1 className="header-text">THE NEWS</h1>
    </Link></header>
  );
}

export default Header;
