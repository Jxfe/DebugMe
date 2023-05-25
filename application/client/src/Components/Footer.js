import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

/**
 * Todo
 */
function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="name-decor" style={{ display: "flex", alignItems: "center" }}>
        <img src="/logo.png" className="img-logo" />
        © 2023 DEBUGME, Inc.</div>
      <a href="/policy" target="_blank">
        Terms
      </a>
      <a href='/contact' target="_blank">
        Contact
      </a>
    </footer>
  );
}

export default Footer;
