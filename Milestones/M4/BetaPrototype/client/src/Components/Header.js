import "./style.css";
import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { Link, useLocation, useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
            <Badge badgeContent={2} color="primary" className="header-badge">
              <MailIcon
                color="action"
                aria-describedby={id}
                onClick={handleClick}
              />
            </Badge>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="popover-container">
                <div onClick={() => navigate("/mypage/mentoring-requests")}>
                  You have a new montoring request.
                </div>
                <div onClick={() => navigate("/mypage/messages")}>
                  You have a new message.
                </div>
              </div>
            </Popover>
            <Link to="/" onClick={() => alert("Successfully signed out!")}>Sign Out</Link>
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
