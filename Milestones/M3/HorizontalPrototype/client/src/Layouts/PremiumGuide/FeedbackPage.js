import React from "react"; // Needed for AWS since it's using node 16
import './style.css';

function SubmitFeedback() {
    return(
      <div class="feedback-container">
        <div class="main">
          <h1>There is gonna be a textfield with ratings down below.</h1>
        </div>
        <a href="/feedbackpage" class="feedback-btn">Submit</a>
      </div>
    );
}


export default SubmitFeedback;