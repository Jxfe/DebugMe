import React from "react"; // Needed for AWS since it's using node 16
import { Link } from "react-router-dom";

import "./style.css";

function MyPage() {
  return (
    <div className="mypage-container">
      <div className="mypage-contents">
        <div className="mypage-nav">
          <h1>My Page</h1>
          <Link to="/updatepayment" className="mypage-nav-link">
            Financial Information
          </Link>
          <Link to="/mypage/messages" className="mypage-nav-link">
            Direct Messages
          </Link>
          <Link to="/mypage/mentoring-requests" className="mypage-nav-link">
            Mentoring Session Requests
          </Link>
          <Link to="/mypage/mentoring-sessions" className="mypage-nav-link">
            My Mentoring Sessions
          </Link>
          <Link to="/myevents" className="mypage-nav-link">
            My Events
          </Link>
          <Link to="/mypage/customer-requests" className="mypage-nav-link">
            Customer Requests
          </Link>
        </div>

        <div className="mypage-personalinfo">
          <h1>Personal Information</h1>
          <div>
            <p className="personalinfo-field-head">Name</p>
            <p>Jose Ortiz</p>
          </div>
          <div>
            <p className="personalinfo-field-head">Email</p>
            <p>joseo@sfsu.edu</p>
          </div>
          <div>
            <p className="personalinfo-field-head">Subscription Plan</p>
            <p>Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
