import React, { useState } from "react"; // Needed for AWS since it's using node 16
import { useNavigate } from "react-router-dom";
import SignUpInput from "./SignUpInput";
import "./style.css";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const DUMMY_ID = ["test01@gmail.com", "test02@gmail.com", "test03@gamil.com"];

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isValidname, setIsValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);
  const [agreement, setAgreement] = useState(false);

  // it should be API call in a real application.
  const duplicateEmailCheck = (email) => {
    for (let id of DUMMY_ID) {
      if (email === id) return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !isValidname ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidPasswordConfirm ||
      !agreement
    ) {
      return;
    }

    const canUseEmail = duplicateEmailCheck(email);
    if (!canUseEmail) {
      setEmailWarning("This email has been already used.");
      alert("This email has been already used.");
      setIsValidEmail(false);
      return;
    }

    alert("successfuly registered!");
    navigate("/");
  };

  const changeName = (e) => {
    let value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  };

  const changeEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setIsValidEmail(false);
      setEmailWarning("Email should be in a right form.");
    } else {
      setIsValidEmail(true);
    }
  };

  const changePassword = (e) => {
    let value = e.target.value;
    setPassword(value);
    if (!passwordRegex.test(value)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }

    if (value !== passwordConfirm) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const changePasswordConfirm = (e) => {
    let value = e.target.value;
    setPasswordConfirm(value);
    if (password !== value) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const changeAgreement = () => {
    setAgreement((prev) => !prev);
  };

  return (
    <main className="main">
      <h1>REGISTRATION</h1>
      <form className="form-container" onSubmit={submitForm}>
        <SignUpInput
          name="name"
          value={name}
          changeValue={changeName}
          isValidValue={isValidname}
          warning="Name should be more than 3 characters."
          placeholder={"Full Name"}
        />
        <SignUpInput
          name="email"
          value={email}
          changeValue={changeEmail}
          isValidValue={isValidEmail}
          warning={emailWarning}
          placeholder={"Email"}
        />
        <SignUpInput
          name="password"
          value={password}
          changeValue={changePassword}
          isValidValue={isValidPassword}
          warning="Password needs to contain at least one uppercase letter, one digit, one special character, and have a minimum length of 8 characters."
          placeholder={"Password"}
        />
        <SignUpInput
          name="password-confirm"
          value={passwordConfirm}
          changeValue={changePasswordConfirm}
          isValidValue={isValidPasswordConfirm}
          warning="password and password confirm must be same."
          placeholder={"Confirm Password"}
        />
        <div className="checkbox-container">
          <input
            style={{ width: "100px" }}
            type="checkbox"
            id="agreement"
            value={agreement}
            onChange={changeAgreement}
          />
          <label htmlFor="agreement">I agree with the term.</label>
        </div>
        <button
          disabled={
            !isValidname ||
            !isValidEmail ||
            !isValidPassword ||
            !isValidPasswordConfirm ||
            !agreement
          }
          type="submit"
          className="submit-button"
        >
          SUBMIT
        </button>
      </form>
    </main>
  );
}

export default SignUp;
