import React, { useContext, useEffect, useState } from "react"; // Needed for AWS since it's using node 16
import { customAxios } from "../../utils/customAxios";
import AuthContext from "../../Context/AuthProvider";
import Button from "../../Components/Button";
import Textare from "../../Components/Textarea";
import "./mypage.css";

function Messages() {
  const { auth } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState({});
  const [uesrList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const getMessages = async () => {
    try {
      const url = "/api/messages";
      const res = await customAxios(url);
      const data = res.data;
      const temp = [];
      for (const key in data) {
        temp.push(key);
        if (selectedUser === "") setSelectedUser(key);
      }
      setMessages(res.data);
      setUserList(temp);
    } catch (e) {
      setMessages({});
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const addMessage = async () => {
    let data = {};
    const ms = messages[selectedUser][0];
    if (ms.sender_email === selectedUser) {
      data = {
        receiver_id: ms.sender_id,
        receiver_email: ms.sender_email,
        sender_id: ms.receiver_id,
        sender_email: ms.receiver_email,
        content: text,
      };
    } else {
      data = {
        sender_id: ms.sender_id,
        sender_email: ms.sender_email,
        receiver_id: ms.receiver_id,
        receiver_email: ms.receiver_email,
        content: text,
      };
    }
    try {
      const res = await customAxios({
        method: "post",
        url: "/api/messages",
        data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (res.status === 201) {
        getMessages();
        setText("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Messages</h1>
      <div className="chatting-layout">
        <div className="mypage-mentoring-list">
          {uesrList.map((each) => {
            return (
              <div
                key={each}
                id={each === selectedUser ? "mypage-selected-name" : null}
                className="mypage-request-name"
                onClick={() => setSelectedUser(each)}
              >
                {each}
              </div>
            );
          })}
        </div>
        <div className="message-box">
          <div className="mypage-message-detail">
            {selectedUser &&
              messages[selectedUser].map((each) => {
                return (
                  <div
                    key={each.id}
                    className={
                      each.sender_email === auth.email
                        ? "send-message"
                        : "receive-message"
                    }
                  >
                    <div className="message-label">
                      {each.sender_email === auth.email ? "Me" : selectedUser}
                    </div>
                    <div>{each.content}</div>
                  </div>
                );
              })}
          </div>
          {
            selectedUser &&
            <>
              <Textare
                className="default-textarea message-textarea"
                rows={3}
                value={text}
                onChangeEvent={(e) => setText(e.target.value)}
              />
              <div>
                <Button
                  className="default-button"
                  onClickEvent={addMessage}
                  content="SEND"
                />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Messages;
