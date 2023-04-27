import React from "react"; // Needed for AWS since it's using node 16
import './style.css';
import { Link } from "react-router-dom";

function Upgrade() {
    return(
      <div class="box">
        <h4>TO ACCESS THE PREMIUM GUIDE YOU HAVE TO UPGRADE TO THE PREMIUM SUBSCRIPTION PLAN</h4>
        <a href="/successpage" class="btn2">Upgrade</a>
        <a href="/premiumguides" class="cancel-btn">Cancel</a>
      </div>
    );
}


export default Upgrade;