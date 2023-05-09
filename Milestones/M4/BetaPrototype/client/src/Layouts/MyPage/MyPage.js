import React from "react"; // Needed for AWS since it's using node 16
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import MentoringRequest from "./MentoringRequest";
import CustomerRequest from "./CustomerRequests";
import MentoringSessions from "./MentoringSessions";
import Messages from "./Messages";
import "./mypage.css";
import Profile from "./Profile";
import UpdatePayment from "../UpdatePayment/UpdatePayment";

function MyPage() {
  const { pathname } = useLocation();
  return (
    <div className="mypage-layout">
      <div className="mypage-content">
        <div className="mypage-navbar">
          <h1>My Page</h1>
          <Link
            to="/mypage/profile"
            className={
              pathname.includes("profile")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Profile
          </Link>
          <Link
            to="/mypage/updatepayment"
            className={
              pathname.includes("updatepayment")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Financial Information
          </Link>
          <Link
            to="/mypage/messages"
            className={
              pathname.includes("messages")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Direct Messages
          </Link>
          <Link
            to="/mypage/mentoring-requests"
            className={
              pathname.includes("mentoring-requests")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Mentoring Session Requests
          </Link>
          <Link
            to="/mypage/mentoring-sessions"
            className={
              pathname.includes("mentoring-sessions")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            My Mentoring Sessions
          </Link>
          {/* <Link to="/myevents" className="mypage-nav-link">
            My Events
          </Link>
          <Link to="/mypage/customer-requests" className="mypage-nav-link">
            Customer Requests
          </Link> */}
        </div>

        <div className="mypage-personalinfo">
          <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="updatepayment" element={<UpdatePayment />} />
            <Route path="mentoring-requests" element={<MentoringRequest />} />
            <Route path="customer-requests" element={<CustomerRequest />} />
            <Route path="mentoring-sessions" element={<MentoringSessions />} />
            <Route path="messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
