import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./myEvents.css";
import Button from "../../Components/Button";

const MyEvent = () => {
  const navigate = useNavigate();
  const [eventInfo, setEventInfo] = useState();
  const [activeBtn, setActiveBtn] = useState({
    activeObject: { id: 0 },
    objects: [{ id: 0 }, { id: 1 }, { id: 2 }],
    contents: ["Attending", "Hosting", "Saved"]
  });

  useEffect(() => {
    toggleActive(0);
    toggleActiveStyle(0);
    toggleDisplay(0);
  }, []);

  function toggleActiveStyle(index) {
    if (activeBtn.objects[index] === activeBtn.activeObject) {
      return "active";
    } else {
      return "undefined";
    }
  }

  function toggleActive(index) {
    toggleDisplay(index);
    setActiveBtn({
      ...activeBtn,
      activeObject: activeBtn.objects[index]
    });
  }

  function toggleDisplay(index) {
    if (index === 0) {
      setEventInfo("Not attending any events");
    } else if (index === 1) {
      const data = !localStorage.getItem("eventData") ? (
        <li>Not hosting any events</li>
      ) : (
        JSON.parse(localStorage.getItem("eventData")).map((element, index) => (
          <li>
            <Link to={`/event/${index}`}>{element.title}</Link>
          </li>
        ))
      );
      setEventInfo(<li>{data}</li>);
    } else {
      setEventInfo(<li>No events saved</li>);
    }
  }

  const goToCreateEvent = () => {
    navigate("/createevent");
  };

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
              onClickEvent={() => toggleActive(index)}
            />
          ))}
        </div>
        <div>
          <ul>{eventInfo}</ul>
        </div>
      </div>
      <div className="create-btn-container">
        <Button content="Create" onClickEvent={goToCreateEvent} />
      </div>
    </main>
  );
};

export default MyEvent;
