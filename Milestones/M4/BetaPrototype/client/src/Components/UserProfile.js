import React, { useEffect, useState } from "react";

import Button from "./Button";

import "./style.css";

export default function UserProfile({ profileContents }) {
  const [userID, setUserID] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [onClose, setOnClose] = useState(null);

  useEffect(() => {
    setUserID(() => profileContents?.userID);
    setProfilePic(() => profileContents?.profilePic);
    setUsername(() => profileContents?.username);
    setBio(() => profileContents?.bio);
    setOnClose(() => profileContents?.onClose);
  }, [profileContents]);

  return (
    <div>
      <div className="profile-container">
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
          <div className="username-bio">
            <h1>{username}</h1>
            <p>{bio}</p>
          </div>
        </div>

        <div className="profile-buttons">
          <Button className={"default-button"} content="Message" />
          <Button
            className={"outline-button"}
            content="Close"
            onClickEvent={onClose}
          />
        </div>
      </div>
    </div>
  );
}
