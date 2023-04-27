import React from "react";
import { Link } from "react-router-dom"; // Needed for AWS since it's using node 16

function MyPage() {
  return (
    <div>
      <div>
        <h3>My Page</h3>
        <Link to="/myevents">View Your Events</Link>
      </div>
    </div>
  );
}

export default MyPage;
