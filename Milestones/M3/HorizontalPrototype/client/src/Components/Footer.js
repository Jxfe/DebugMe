import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

/**
 * Todo
 */
function Footer() {
  return (
    <footer className="footer-wrapper">
      <div>© 2023 DEGUBME, Inc.</div>
      <div className="footer-content">
        <a href="/policy" target="_blank">
          Terms
        </a>
        <a href="/policy" target="_blank">
          Privacy
        </a>
        <a href="/policy" target="_blank">
          Security
        </a>
        <a href="/policy" target="_blank">
          Status
        </a>
        <a href="/policy" target="_blank">
          About
        </a>
        <a href="/policy" target="_blank">
          Career
        </a>
      </div>
    </footer>
  );
}

export default Footer;
