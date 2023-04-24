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
import UpgradePage from "./Layouts/PremiumGuide/UpgradePage";
import SuccessPage from "./Layouts/PremiumGuide/SuccessPage";
import ShowGuide from "./Layouts/PremiumGuide/ShowGuide";
import FeedbackPage from "./Layouts/PremiumGuide/FeedbackPage";
import SignIn from "./Layouts/SignIn/SignIn";
import SignUp from "./Layouts/SignUp/SignUp";

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
          <Route path="upgradepage" element={<UpgradePage />} />
          <Route path="successpage" element={<SuccessPage />} />
          <Route path="showguide" element={<ShowGuide />} />
          <Route path="feedbackpage" element={<FeedbackPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
