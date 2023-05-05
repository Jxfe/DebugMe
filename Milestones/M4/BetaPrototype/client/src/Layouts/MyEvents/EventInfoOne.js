import React from "react";
import DatePicker from "react-datepicker";
import { useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./createEvent.css";

const EventInfoOne = ({ formData, setFormData }) => {
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);
  return (
    <div className="event-form1">
      <input
        ref={titleRef}
        type="text"
        id="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={(event) => {
          setFormData({ ...formData, title: event.target.value });
        }}
      />
      <input
        type="text"
        id="location"
        placeholder="Location"
        value={formData.location}
        onChange={(event) => {
          setFormData({ ...formData, location: event.target.value });
        }}
      />
      <DatePicker
        selected={formData.date || new Date()}
        onChange={(date) => setFormData({ ...formData, date: date })}
      />
    </div>
  );
};

export default EventInfoOne;
