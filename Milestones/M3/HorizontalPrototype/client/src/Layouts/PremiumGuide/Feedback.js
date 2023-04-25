import React from "react"; // Needed for AWS since it's using node 16
import './style.css';
import { Link } from "react-router-dom";


function SubmitFeedback() {
    return(
      <div class="feedback-container">
        <div class="main">
          <h1>There is gonna be a textfield with ratings down below.</h1>
        </div>
        <Link to="/feedback" class="feedback-btn">Submit</Link> 
      </div>
    );
}


export default SubmitFeedback;