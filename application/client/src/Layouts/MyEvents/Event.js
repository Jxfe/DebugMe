import React, { useState } from "react";
import Button from "../../Components/Button";
import { useParams, useNavigate } from "react-router-dom";
import "./event.css";

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("eventData"));
  const [attendees, setAttendees] = useState([
    "Jiji",
    "Jenny",
    "Emilee",
    "Cris"
  ]);

  const messageAttendees = () => {
    navigate("/myevents/eventmessages");
  };

  const removeAttendee = (e) => {
    attendees.splice(e.target.id, 1);
    setAttendees([...attendees]);
  };

  const backToEvents = () => {
    navigate("/myevents");
  };

  return (
    <main className="container">
      <div className="event-nav">
        <h4 className="title">{data[id].title}</h4>
        <Button content="Back" onClickEvent={backToEvents} />
      </div>
      <div>
        <div className="event-header">
          <span>[ Attending ]</span>
        </div>
        <div className="event-body">
          {attendees.map((attendee, index) => (
            <div className="event-participants">
              <span>{attendee}</span>
              <div className="event-participants-btns">
                <Button content="message" onClickEvent={messageAttendees} />
                <Button
                  id={index}
                  content="remove"
                  onClickEvent={(e) => removeAttendee(e)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="event-footer">
          <Button content="Send All" onClickEvent={messageAttendees} />
        </div>
      </div>
    </main>
  );
};

export default Event;
