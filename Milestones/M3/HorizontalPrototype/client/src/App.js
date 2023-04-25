import React from "react"; // Needed for AWS since it's using node 16
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Calendar from "./Layouts/Calendar/Calendar";
import MentoringRequest from "./Layouts/MyPage/MentoringRequest";
import Messages from "./Layouts/MyPage/Messages";
import Error from "./Layouts/Error/Error";
import Main from "./Layouts/Main/Main";
import MyPage from "./Layouts/MyPage/MyPage";
import Posts from "./Layouts/Posts/Posts";
import PremiumGuide from "./Layouts/PremiumGuide/PremiumGuide";
import UpgradePage from "./Layouts/PremiumGuide/UpgradePage";
import SuccessPage from "./Layouts/PremiumGuide/SuccessPage";
import ShowGuide from "./Layouts/PremiumGuide/ShowGuide";
import Feedback from "./Layouts/PremiumGuide/Feedback";
import SignIn from "./Layouts/SignIn/SignIn";
import SignUp from "./Layouts/SignUp/SignUp";
import UpdatePayment from "./Layouts/UpdatePayment/UpdatePayment";
import MyEvents from "./Layouts/MyEvents/MyEvents";
// import CreateEvent from "./Layouts/MyEvents/CreateEvent";
import Event from "./Layouts/MyEvents/Event";
import CreateGuide from "./Layouts/CreateGuide/CreateGuide";

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
          <Route path="feedback" element={<Feedback />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="myevents" element={<MyEvents />} />
          {/* <Route path="createevent" element={<CreateEvent />} /> */}
          <Route path="event/:id" element={<Event />} />
          <Route path="mypage" exact element={<MyPage />} />
          <Route
            path="mypage/mentoring-requests"
            element={<MentoringRequest />}
          />
          <Route path="mypage/messages" element={<Messages />} />
          <Route path="*" element={<Error />} />
          <Route path="updatepayment" element={<UpdatePayment />} />
          <Route path="CreateGuide" element={<CreateGuide />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
