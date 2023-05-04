import React from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";
import InsertPost from "../../Components/InsertPost";
import SearchPost from "../../Components/SearchPost";
import { Link } from "react-router-dom";

import "./style.css";

function Main() {
  return (
    <div className="homepage-container">
        <div className="hero">
          <div className="hero-left"> 
            <img src="https://media.istockphoto.com/id/1181250359/photo/business-people.jpg?s=1024x1024&w=is&k=20&c=YNRK_RMfy98iOmkkJwzcDJg2uoZqmymNyXbyvKo7qIU=" className="hero-img"></img>
          </div>
          <div className="hero-right">
            <h1>Join us - and find success in your Tech Internship!</h1>
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
