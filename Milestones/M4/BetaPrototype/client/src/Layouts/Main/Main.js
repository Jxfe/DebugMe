import React from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";
import InsertPost from "../../Components/InsertPost";
import SearchPost from "../../Components/SearchPost";
import { Link } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ForumIcon from '@mui/icons-material/Forum';

import "./style.css";

function Main() {
  return (
    <div className="homepage-container">

      <div className="hero">
        <div className="hero-left"> 
          <img src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" className="hero-img"></img>
        </div>
        <div className="hero-right">
          <h1>Join us - learn to Intern!</h1>
          <h3>DebugMe is home to a community dedicated to help you find success in your tech internship.</h3>
          <div className="hero-buttons">
            <Link to="signin" >
              <Button className={"default-button"} content={"Sign In"} />
            </Link>
            <Link to="signup" >
              <Button className={"default-button"} content={"Sign Up"} />
            </Link>
          </div>
        </div>
      </div>

      <div className="services-container">
        <div className="service-card">
          <h1>Network</h1>
          <ForumIcon fontSize="large" />
          <p className="service-description">Connect with others through our Forum. Get your internship questions answered, or share your ideas with others.</p>
          <Link to="posts">
            <Button className={"default-button"} content={"Learn More"} />
          </Link>
        </div>

        <div className="service-card">
          <h1>Get Expert Help</h1>
          <HandshakeIcon fontSize="large" />
          <p className="service-description">Upgrade to our Premium Plan and gain access to Premium Guides and the opportunity to book a Mentoring Session with our Mentors!</p>
          <Link to="premiumguides">
            <Button className={"default-button"} content={"Learn More"} />
          </Link>
        </div>

        <div className="service-card">
          <h1>Organize</h1>
          <CalendarMonthIcon fontSize="large"/>
          <p className="service-description"> Use our Calendar to find out about events created by our community to help you prepare for your internship.</p>
          <Link to="calendar">
            <Button className={"default-button"} content={"Learn More"} />
          </Link>
        </div>
      </div>

      <div className="insert-search">
        <div className="insert">
          <InsertPost />
        </div>
        <div className="search">
          <SearchPost />
        </div>
        
      </div>
    </div>
  );
}

export default Main;
