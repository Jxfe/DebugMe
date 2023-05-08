import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import Button from "../../Components/Button";
import axios from "axios";
import AuthContext from "../../Context/AuthProvider";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setAuth } = useContext(AuthContext);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Email: ", email);
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
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data.access_token;
        const userRank = response.data.userRank;
        setAuth({ username, email, password, userRank, accessToken });

        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/mypage");
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

  return (
    <div className="SignIn">
      <p className={errorMsg ? "error" : "offscreen"}>{errorMsg}</p>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            ref={inputRef}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
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
        <Button className="default-button" content="Sign In" />
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SignIn;
