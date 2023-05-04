import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import EventInfoOne from "./EventInfoOne";
import EventInfoTwo from "./EventInfoTwo";
import "./createEvent.css";

function Form() {
  const [eventIndex, setEventIndex] = useState(
    JSON.parse(localStorage.getItem("eventIndex")) || 0
  );

  const [formData, setFormData] = useState({
    id: eventIndex,
    title: "",
    location: "",
    date: "",
    image: "",
    membersOnly: false
  });

  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("eventData")) || []
  );

  const [page, setPage] = useState(0);
  const FormPageTitles = ["Event Description", "Event Image"];

  useEffect(() => {
    console.log("Inside useEffect. Events data:");
    localStorage.setItem("eventData", JSON.stringify(events));
  }, [events]);

  const DisplayPage = () => {
    if (page === 0) {
      return <EventInfoOne formData={formData} setFormData={setFormData} />;
    } else {
      return <EventInfoTwo formData={formData} setFormData={setFormData} />;
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    const tmpArr = [...events];
    tmpArr.push(formData);
    localStorage.setItem("eventIndex", eventIndex + 1);
    localStorage.setItem("eventData", JSON.stringify(tmpArr));
    setEvents(tmpArr);
    navigate("/myevents");
  };
  return (
    <div className="container">
      <h3 className="title">{FormPageTitles[page]}</h3>
      <div className="form-body">{DisplayPage()}</div>
      <div className="form-footer btn-container">
        <Button
          isDisabled={page === 0}
          onClickEvent={() => {
            setPage((currentPage) => currentPage - 1);
          }}
          content="Previous"
        />
        <Button
          onClickEvent={() => {
            if (page === FormPageTitles.length - 1) {
              alert("Event Created");
              setEventIndex((prevIndex) => prevIndex + 1);
              handleClick();
            } else {
              setPage((currentPage) => currentPage + 1);
            }
          }}
          content={page === FormPageTitles.length - 1 ? "Create" : "Next"}
        />
      </div>
    </div>
  );
}

export default Form;
