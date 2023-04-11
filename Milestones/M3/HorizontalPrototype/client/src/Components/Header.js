import "./style.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="wrapper header-wrapper">
      <Link className="logo" to="/">
        DEBUGME
      </Link>
      <nav className="wrapper link-wrapper">
        <Link to="/posts">Posts</Link>
        <Link to="/premiumguides">Premium Gudies</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>
      <nav className="wrapper link-wrapper">
        <Link to="/mypage">My Page</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    </header>
  );
}

export default Header;
