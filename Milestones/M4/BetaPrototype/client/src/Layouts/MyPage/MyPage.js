import React, { useEffect, useState } from "react"; // Needed for AWS since it's using node 16
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import SavedPremiumGuides from "./SavedPremiumGuides";
import CustomerRequest from "./CustomerRequests";
import MentoringSessions from "./MentoringSessions";
import Messages from "./Messages";
import "./mypage.css";
import Profile from "./Profile";
import UpdatePayment from "../UpdatePayment/UpdatePayment";
import { customAxios } from "../../utils/customAxios";

function MyPage() {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const url = "/api/profile";
        const res = await customAxios(url);
        const data = res.data;
        setProfile(data);
        console.log(data)
      } catch (e) {
        console.log(e);
      }
    }

    getProfile();
  }, [])

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
          {/* <Link
            to="/mypage/updatepayment"
            className={
              pathname.includes("updatepayment")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Financial Information
          </Link> */}
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
            to="/mypage/mentoring-sessions"
            className={
              pathname.includes("mentoring-sessions")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            My Mentoring Sessions
          </Link>
          <Link
            to="/mypage/saved-premium-guides"
            className={
              pathname.includes("saved-premium-guides")
                ? "highlight mypage-nav-link"
                : "mypage-nav-link"
            }
          >
            Saved Premium Guides
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
            <Route path="saved-premium-guides" element={<SavedPremiumGuides saved={profile.saved} />} />
            <Route path="customer-requests" element={<CustomerRequest />} />
            <Route path="mentoring-sessions" element={<MentoringSessions menteeSessions={profile.menteeSessions} mentorSessions={profile.mentorSessions} mentoringRequests={profile.mentoringRequests} />} />
            <Route path="messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
