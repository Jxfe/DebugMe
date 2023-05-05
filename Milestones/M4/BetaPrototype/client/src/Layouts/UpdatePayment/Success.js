import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

function Success() {
  return (
    <div>
      <h2>Thank you for adding your payment method.</h2>
      <a href="/premiumguides" class="btn3">
        {" "}
        Go back to Premium guide
      </a>
    </div>
  );
}

export default Success;
