import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

/**
 * Todo
 */
function Footer() {
  return (
    <footer className="footer-wrapper">
      <div>© 2023 DEBUGME, Inc.</div>
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
