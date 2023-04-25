import React, { useState } from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";
import Textare from "../../Components/Textarea";
import "./style.css";

const mentoringLists = [
  {
    id: 1,
    name: "samuel",
    requestedDate: "4-24",
  },
  {
    id: 2,
    name: "Jiji",
    requestedDate: "3-28",
  },
  {
    id: 3,
    name: "Josh",
    requestedDate: "3-24",
  },
  {
    id: 4,
    name: "Amy",
    requestedDate: "3-21",
  },
];

const messageList = [
  {
    id: 1,
    send: false,
    content: "Hello",
  },
  {
    id: 2,
    send: false,
    content: "How are you?",
  },
];

function Messages() {
  const [selectedMentoring, setSelectedMentoring] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(messageList);

  const addMessage = () => {
    setMessages([
      ...messages,
      { id: messages.length + 1, send: true, content: text },
    ]);
  };

  return (
    <div>
      <h1>Messages</h1>
      <div className="chatting-layout">
        <div className="mentoring-list">
          {mentoringLists.map((each) => {
            return (
              <div
                key={each.id}
                className="request-name"
                onClick={() => setSelectedMentoring(each)}
              >
                {each.name}
              </div>
            );
          })}
        </div>
        <div className="message-box">
          {selectedMentoring && (
            <div className="message-detail">
              {messages.map((each) => {
                return (
                  <div
                    key={each.id}
                    className={each.send ? "send-message" : "receive-message"}
                  >
                    <div className="message-label">
                      {each.send ? "Me" : selectedMentoring.name}
                    </div>
                    <div>{each.content}</div>
                  </div>
                );
              })}
              <div></div>
            </div>
          )}
          <Textare
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
        </div>
      </div>
    </div>
  );
}

export default Messages;
