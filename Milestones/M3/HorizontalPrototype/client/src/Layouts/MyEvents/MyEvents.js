import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./myEvents.css";
import Button from "../../Components/Button";

const MyEvent = () => {
  const [activeBtn, setActiveBtn] = useState({
    activeObject: null,
    objects: [{ id: 0 }, { id: 1 }, { id: 2 }],
    contents: ["Attending", "Hosting", "Saved"]
  });
  const navigate = useNavigate();

  const goToCreateEvent = () => {
    navigate("/createevent");
  };

  function toggleActiveStyle(index) {
    if (activeBtn.objects[index] === activeBtn.activeObject) {
      return "active";
    } else {
      return "undefined";
    }
  }

  function toggleActive(index) {
    setActiveBtn({
      ...activeBtn,
      activeObject: activeBtn.objects[index]
    });
  }

  return (
    <main className="container">
      <h3>Your Events</h3>
      <div className="events-container">
        <div className="events-buttons">
          {activeBtn.objects.map((elements, index) => (
            <Button
              key={index}
              className={toggleActiveStyle(index)}
              content={activeBtn.contents[index]}
              onClickEvent={() => {
                toggleActive(index);
              }}
            />
          ))}
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
        <Button content="Create" onClickEvent={goToCreateEvent} />
      </div>
    </main>
  );
};

export default MyEvent;
