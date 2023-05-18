import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import { customAxios } from "../utils/customAxios";
import Button from "./Button";

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
    // const ms = messages[selectedUser][0];
    // if (ms.sender_email === selectedUser) {
    //   data = {
    //     receiver_id: ms.sender_id,
    //     receiver_email: ms.sender_email,
    //     sender_id: ms.receiver_id,
    //     sender_email: ms.receiver_email,
    //     content: text,
    //   };
    // } else {
    //   data = {
    //     sender_id: ms.sender_id,
    //     sender_email: ms.sender_email,
    //     receiver_id: ms.receiver_id,
    //     receiver_email: ms.receiver_email,
    //     content: text,
    //   };
    // }
    if (auth?.userID == userID) {
      alert("Sending message to yourself.");
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
        //getMessages();
        //setText("");
        alert("Message sent");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <button
            className="profile-close-btn"
            value="X"
            onClick={onClose}
          ></button>
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
              <span>{username}</span>
              <span>{bio}</span>
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
              {/* <Button
                className={"outline-button"}
                content="Close"
                onClickEvent={onClose}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
