import React from "react"; // Needed for AWS since it's using node 16
import './style.css';
import { Link } from "react-router-dom";

function Success() {
    return(
      <div>
        <h2>YOU HAVE SUCCESSFULLY UPGRADED TO THE PREMIUM SUBSCRIPTION PLAN</h2>
        <a href="/showguide" class="btn3"> Go back to Premium guide</a>
      </div>
    );
}


export default Success;