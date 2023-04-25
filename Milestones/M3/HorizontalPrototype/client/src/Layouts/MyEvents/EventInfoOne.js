import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventInfoOne = ({ formData, setFormData }) => {
  return (
    <div className="event-form1">
      <input
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
