import React, { useState, useEffect, useRef } from "react"; // Needed for AWS since it's using node 16
import { useNavigate } from "react-router-dom";
import SignUpInput from "./SignUpInput";
import axios from "axios";
import "./style.css";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

function SignUp() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isValidname, setIsValidName] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [canUseEmail, setCanUseEmail] = useState(false);
  const [emailWarning, setEmailWarning] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(false);
  const [agreement, setAgreement] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    axios({
      method: "post",
      url: "/api/checkEmailDuplicate",
      data: {
        email: email
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((response) => {
        if (Object.keys(response.data).length === 0) {
          return true;
        } else {
          return false;
        }
      })
      .then((result) => {
        setCanUseEmail(() => result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);

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

    if (!canUseEmail) {
      setEmailWarning("This email has been already used.");
      alert("This email has been already used.");
      setIsValidEmail(false);
      return;
    }

    axios({
      method: "post",
      url: "/api/register",
      data: {
        name: name,
        email: email,
        password: password
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then((response) => {
        if (response) {
          alert("successfuly registered!");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
        <div className="input-container">
          <label className="input-label" htmlFor="name">
            name
          </label>
          <input
            className="input-box"
            ref={inputRef}
            autoComplete="off"
            type="text"
            id="name"
            onChange={changeName}
            placeholder="Full Name"
          />
          <p className="warning">
            {!isValidname &&
              isValidname !== "" &&
              "Name should be more than 3 characters."}
          </p>
        </div>
        <SignUpInput
          name="email"
          value={email}
          changeValue={changeEmail}
          isValidValue={isValidEmail}
          warning={emailWarning}
          placeholder={"Email xxx@xxx.com"}
        />
        <SignUpInput
          name="password"
          value={password}
          changeValue={changePassword}
          isValidValue={isValidPassword}
          warning="Password needs to contain at least one uppercase letter, one digit, one special character, and have a minimum length of 8 characters."
          placeholder={
            "At least one uppercase letter, one digit, one special character, and a minimum length of 8 characters."
          }
        />
        <SignUpInput
          name="password-confirm"
          value={passwordConfirm}
          changeValue={changePasswordConfirm}
          isValidValue={isValidPasswordConfirm}
          warning="password and password confirm must be same."
          placeholder={"password and password-confirm must be same."}
        />
        <div className="checkbox-container">
          <input
            //style={{ width: "100px" }}
            className="agreement-checkbox"
            type="checkbox"
            id="agreement"
            value={agreement}
            onChange={changeAgreement}
          />
          <label className="agreement-label" htmlFor="agreement">
            I agree with this{" "}
            <a href="/policy" target="_blank" id="text-deco">
              term
            </a>
            .
          </label>
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
