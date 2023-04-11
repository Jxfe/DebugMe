import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Calendar from "./Layouts/Calendar/Calendar";
import Error from "./Layouts/Error/Error";
import Main from "./Layouts/Main/Main";
import Posts from "./Layouts/Posts/Posts";
import PremiumGuide from "./Layouts/PremiumGuide/PremiumGuide";
import SignIn from "./Layouts/SignIn/SignIn";
import SignUp from "./Layouts/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="posts" element={<Posts />} />
          <Route path="premiumguide" element={<PremiumGuide />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
