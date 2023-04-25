import React from "react"; // Needed for AWS since it's using node 16
import './style.css';
import { Link } from "react-router-dom";


function SubmitFeedback() {
  return(
    <div class="feedback-container">
      <h2>Please, leave an honest feedback about the premium guide!</h2>
      <textarea>Write something here ...</textarea>
      <div class="star-wrapper">
        <a href="#" class="fas fa-star s1 checked"></a>
        <a href="#" class="fas fa-star s2"></a>
        <a href="#" class="fas fa-star s3"></a>
        <a href="#" class="fas fa-star s4"></a>
        <a href="#" class="fas fa-star s5"></a>
      </div> <br/><br/><br/><br/><br/>
      <Link class="submit">Submit</Link>
    </div>
  );
}


export default SubmitFeedback;