import "./style.css";
import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <header className="wrapper header-wrapper">
      <Link className="logo" to="/">
        DEBUGME
      </Link>
      <nav className="wrapper link-wrapper">
        <Link
          to="/posts"
          className={pathname.includes("posts") ? "highlight" : null}
        >
          Posts
        </Link>
        <Link
          to="/premiumguides"
          className={pathname.includes("premiumguides") ? "highlight" : null}
        >
          Premium Guides
        </Link>
        <Link
          to="/calendar"
          className={pathname.includes("calendar") ? "highlight" : null}
        >
          Calendar
        </Link>
      </nav>
      <nav className="wrapper link-wrapper">
        <div>Hello, Jose!</div>
        {isSignIn ? (
          <>
            <Link
              to="/mypage"
              className={pathname.includes("mypage") ? "highlight" : null}
            >
              My Page
            </Link>
            <Link to="/signout">Sign Out</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
