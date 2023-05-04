import React, { useState } from "react";
import Button from "../../Components/Button";
import { useParams, Link } from "react-router-dom";
import "./event.css";

const Event = () => {
  const { id } = useParams();
  const data = JSON.parse(localStorage.getItem("eventData"));
  const [attendees, setAttendees] = useState([
    "Jiji",
    "Jenny",
    "Emilee",
    "Cris"
  ]);

  const removeAttendee = (e) => {
    const tmp = attendees.splice(e.target.id, 1);
    setAttendees([...attendees]);
  };

  return (
    <main className="container">
      <div className="event-nav">
        <h4 className="title">{data[id].title}</h4>
        <h4 className="title">
          <Link to="/myevents">Back to MyEvents</Link>
        </h4>
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
                <Button content="message" />
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
          <Button content="Send All" />
        </div>
      </div>
    </main>
  );
};

export default Event;
