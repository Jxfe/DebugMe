import React from "react"; // Needed for AWS since it's using node 16
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Calendar from "./Layouts/Calendar/Calendar";
import Error from "./Layouts/Error/Error";
import Main from "./Layouts/Main/Main";
import MyPage from "./Layouts/MyPage/MyPage";
import Posts from "./Layouts/Posts/Posts";
import PremiumGuide from "./Layouts/PremiumGuide/PremiumGuide";
import SignIn from "./Layouts/SignIn/SignIn";
import SignUp from "./Layouts/SignUp/SignUp";
import MyEvents from "./Layouts/MyEvents/MyEvents";
import CreateEvent from "./Layouts/MyEvents/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="layout">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="posts" element={<Posts />} />
          <Route path="premiumguides" element={<PremiumGuide />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="myevents" element={<MyEvents />} />
          <Route path="createevent" element={<CreateEvent />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
