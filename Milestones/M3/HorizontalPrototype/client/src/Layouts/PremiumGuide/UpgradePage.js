import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

function Upgrade() {
  return (
    <div class="box">
      <h4>
        TO ACCESS THE PREMIUM GUIDE YOU HAVE TO UPGRADE TO THE PREMIUM
        SUBSCRIPTION PLAN
      </h4>
      <a href="/premiumguides" class="btn2">
        Upgrade
      </a>
      <a href="/" class="cancel-btn">
        Cancel
      </a>
    </div>
  );
}

export default Upgrade;
