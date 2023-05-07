import React, { useState, useEffect, useRef, Component } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../utils/commonFuntions";
import { customAxios } from "../../utils/customAxios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email: ");
    console.log("Password: ", password);

    // Login logic here
    axios({
      method: "post",
      url: "/api/login",
      data: {
        email: email,
        password: password
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(() => {
        customAxios({
          method: "get",
          url: "/api/whoami",
          data: {
            email: email,
            password: password
          }
        }).then((response) => {
          console.log(response.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={updateUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            onChange={updateEmail}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={updatePassword}
          />
        </div>
        <Button
          className="default-button"
          content="Submit"
          onClickEvent={handleSubmit}
        />
        {/* <Link to="/premiumguides">
          <Button className="default-button" content="Submit" />
        </Link> */}
      </form>
      <div className="signup-link">
        Don't have an account? <a href="./signup">Sign up</a>
      </div>
    </div>
  );
}

export default SignIn;
