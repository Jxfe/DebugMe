import React from "react"; // Needed for AWS since it's using node 16
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SavedPremiumGuides from "./Layouts/MyPage/SavedPremiumGuides";
import MentoringSessions from "./Layouts/MyPage/MentoringSessions";
import Messages from "./Layouts/MyPage/Messages";
import Error from "./Layouts/Error/Error";
import Main from "./Layouts/Main/Main";
import MyPage from "./Layouts/MyPage/MyPage";
import Posts from "./Layouts/Posts/Posts";
import Post from "./Layouts/Posts/Post";
import PremiumGuide from "./Layouts/PremiumGuide/PremiumGuide";
import ShowGuide from "./Layouts/PremiumGuide/ShowGuide";
import SignIn from "./Layouts/SignIn/SignIn";
import SignUp from "./Layouts/SignUp/SignUp";
import CreateGuide from "./Layouts/CreateGuide/CreateGuide";
import Policy from "./Layouts/Policy/Policy";
import Profile from "./Layouts/MyPage/Profile";
import Layout from "./Components/Layout";
import Unauthorized from "./Components/Unauthorized";
import RequireAuth from "./Components/RequireAuth";
import PersistLogin from "./Components/PersistLogin";
import ContactUs from "./Layouts/Contact/Contact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Main />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="policy" element={<Policy />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Basic User Routes (Protected)*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[0]} />}>
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<Post />} />
              <Route path="premiumguides" element={<PremiumGuide />} />
              <Route path="premiumguides/:id" element={<ShowGuide />} />
              {/* <Route path="mypage" element={<MyPage />} />
              <Route path="mypage" exact element={<MyPage />} /> */}
              <Route path="mypage" exact element={<MyPage />}>
                <Route path="profile" element={<Profile />} />
                <Route path="saved-premium-guides" element={<SavedPremiumGuides />} />
                <Route path="mentoring-sessions" element={<MentoringSessions />} />
                <Route path="messages" element={<Messages />} />
              </Route>
              <Route path="CreateGuide" element={<CreateGuide />} />
            </Route>
          </Route>

          {/* Premium User Routes (Protected)*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[0, 1]} />}></Route>
          </Route>

          {/* Mentor  Routes (Protected)*/}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[0, 2]} />}></Route>
          </Route>


          {/* Catch All Routes */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
