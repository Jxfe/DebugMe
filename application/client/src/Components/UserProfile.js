import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import useAuth from "../Hooks/useAuth";
import { customAxios } from "../utils/customAxios";
import Button from "./Button";
import { toast } from "react-toastify";

import "./style.css";

export default function UserProfile({ profileContents }) {
  const [userID, setUserID] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [onClose, setOnClose] = useState(null);
  const [message, setMessage] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    setUserID(() => profileContents?.userID);
    setProfilePic(() => profileContents?.profilePic);
    setUsername(() => profileContents?.username);
    setEmail(() => profileContents?.email);
    setBio(() => profileContents?.bio);
    setOnClose(() => profileContents?.onClose);
  }, [profileContents]);

  const addMessage = async () => {
    if (auth?.userID == userID) {
      alert("Sending message to yourself.");
      return;
    }

    let data = {
      sender_id: auth?.userID,
      sender_email: auth?.email,
      receiver_id: userID,
      receiver_email: email,
      content: message
    };

    try {
      const res = await customAxios({
        method: "post",
        url: "/api/messages",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      if (res.status === 201) {
        toast.success("Your message has been sent.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <CloseIcon
            className="profile-close-icon"
            onClick={onClose}
          ></CloseIcon>
        </div>
        <div className="user-info">
          <div className="picture-container">
            <img
              src={
                profilePic
                  ? profilePic
                  : "https://media.istockphoto.com/id/1317474419/photo/amazon.jpg?s=1024x1024&w=is&k=20&c=c_fhWiXAuoeQ0vutDiPlVqjVdx23hc1MKtr-HEzmC38="
              }
              className="profile-img"
            />
          </div>
          <div className="profile-data">
            <div className="username-bio">
              <h1>{username}</h1>
              <p>{bio}</p>
            </div>
          </div>
        </div>
        <div className="profile-buttons">
          <textarea
            className="profile-message-textarea"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Button
            className={"default-button"}
            content="Message"
            onClickEvent={addMessage}
          />
        </div>
      </div>
    </div>
  );
}
