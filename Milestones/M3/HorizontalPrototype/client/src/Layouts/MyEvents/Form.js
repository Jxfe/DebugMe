import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import EventInfoOne from "./EventInfoOne";
import EventInfoTwo from "./EventInfoTwo";

function Form() {
  const FormPageTitles = ["Event Description", "Event Image"];
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    image: "",
    membersOnly: false
  });

  const DisplayPage = () => {
    if (page === 0) {
      return <EventInfoOne formData={formData} setFormData={setFormData} />;
    } else {
      return <EventInfoTwo formData={formData} setFormData={setFormData} />;
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
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
