import React from "react";
import Button from "../../Components/Button";
import { useParams } from "react-router-dom";
import "./event.css";

const Event = () => {
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("eventData"));

  return (
    <main className="container">
      <h4>{data[id].title}</h4>
      <div>
        <div className="event-header">
          <span>[ Attending ]</span>
        </div>
        <div className="event-body">
          <div className="event-participants">
            <span>Jiji</span>
            <div className="event-participants-btns">
              <Button content="message" />
              <Button content="remove" />
            </div>
          </div>
          <div className="event-participants">
            <span>Jenny</span>
            <div className="event-participants-btns">
              <Button content="message" />
              <Button content="remove" />
            </div>
          </div>
          <div className="event-participants">
            <span>Emilee</span>
            <div className="event-participants-btns">
              <Button content="message" />
              <Button content="remove" />
            </div>
          </div>
        </div>
        <div className="event-footer">
          <Button content="Send All" />
        </div>
      </div>
    </main>
  );
};

export default Event;
