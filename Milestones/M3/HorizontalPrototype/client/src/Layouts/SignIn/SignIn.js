import React, { useState } from "react";
import "./style.css";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Login logic here
  };

  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <Link to="/premiumguides">
          <Button className="default-button" content="Submit" />
        </Link>
      </form>
      <div className="signup-link">
        Don't have an account? <a href="./signup">Sign up</a>
      </div>
    </div>
  );
}

export default SignIn;
