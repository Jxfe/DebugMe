import React from "react";
import "./myEvents.css";
import Button from "../../Components/Button";

const MyEvent = () => {
  return (
    <main className="container">
      <h3>Your Events</h3>
      <div className="events-container">
        <div className="events-buttons">
          <Button content="Attending" />
          <Button content="Hosting" />
          <Button content="Saved" />
        </div>
        <div>
          <ul>
            <li>Event 1</li>
            <li>Event 2</li>
            <li>Event 3</li>
          </ul>
        </div>
      </div>
      <div className="create-btn-container">
        <Button content="Create" />
      </div>
    </main>
  );
};

export default MyEvent;
