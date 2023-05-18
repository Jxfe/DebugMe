import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./style.css";
import Button from "../../Components/Button";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuth, persist, setPersist } = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      .then((response) => {
        const userID = response.data.user.id;
        const name = response.data.user.username;
        const accessToken = response.data.user.access_token;
        const userRank = response.data.user.userRank;
        const roles = response.data.user.roles;

        setAuth({ userID, username, email, userRank, roles, accessToken });

        setUsername("");
        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (!error.response) {
          setErrorMsg("No Server Response");
        } else if (error.response.status === 400) {
          setErrorMsg(error.response.data.message);
        } else if (error.response.status === 401) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Login Failed");
        }
      });
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  return (
    <div className="SignIn">
      <p className={errorMsg ? "error" : "offscreen"}>{errorMsg}</p>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <input
            ref={inputRef}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /> */}
        </div>
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="persist-container">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Remember me</label>
        </div>
        <Button className="default-button" content="Sign In" />
      </form>
      <div className="signup-link">
        <span className="need-acct-span">Don't have an account?</span>{" "}
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SignIn;
