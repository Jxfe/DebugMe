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
        <div>Terms</div>
        <div>Privacy</div>
        <div>Security</div>
        <div>Status</div>
        <div>About</div>
        <div>Career</div>
      </div>
    </footer>
  );
}

export default Footer;
