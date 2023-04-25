import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import EventInfoOne from "./EventInfoOne";
import EventInfoTwo from "./EventInfoTwo";

function Form() {
  // const [eventIndex, setEventIndex] = useState(() => {
  //   if (localStorage.getItem("eventIndex")) {
  //     return JSON.parse(localStorage.getItem("eventIndex"));
  //   } else {
  //     return 0;
  //   }
  // });

  const [eventIndex, setEventIndex] = useState(
    JSON.parse(localStorage.getItem("eventIndex")) || 0
  );

  const [events, setEvents] = useState(() => {
    if (localStorage.getItem("eventData")) {
      return JSON.parse(localStorage.getItem("eventData"));
    } else {
      return [];
    }
  });
  const FormPageTitles = ["Event Description", "Event Image"];
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    id: -1,
    title: "",
    location: "",
    date: "",
    image: "",
    membersOnly: false
  });

  // useEffect(() => {
  //   const data = localStorage.getItem("eventData");

  //   if (data) {
  //     setEvents(JSON.parse(data));
  //   }
  // }, []);

  useEffect(() => {
    console.log("inside useEffect");
    localStorage.setItem("eventData", JSON.stringify(events));
    //localStorage.setItem("eventData", JSON.stringify(formData));
  }, [events]);

  // useEffect(() => {
  //   localStorage.setItem("eventIndex", eventIndex + 1);
  // }, [eventIndex]);

  const DisplayPage = () => {
    if (page === 0) {
      return <EventInfoOne formData={formData} setFormData={setFormData} />;
    } else {
      return <EventInfoTwo formData={formData} setFormData={setFormData} />;
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // localStorage.setItem("eventData", JSON.stringify(formData));
    localStorage.setItem("eventIndex", eventIndex + 1);
    navigate("/myevents");
  };
  return (
    <div className="form">
      <div className="progress-bar"></div>
      <div className="form-container">
        <div className="form-header">
          <h3>{FormPageTitles[page]}</h3>
        </div>
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
                setFormData({ ...formData, id: eventIndex });
                setEvents((prevState) => [...prevState, formData]);
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
    </div>
  );
}

export default Form;
