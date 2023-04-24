import React, { useState } from "react";
import Button from "../../Components/Button";
import EventInfo_1 from "./EventInfo_1";
import EventInfo_2 from "./EventInfo_2";

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
      return <EventInfo_1 formData={formData} setFormData={setFormData} />;
    } else {
      return <EventInfo_2 formData={formData} setFormData={setFormData} />;
    }
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
            // isDisabled={page === FormPageTitles.length - 1}
            onClickEvent={() => {
              if (page === FormPageTitles.length - 1) {
                alert("Event Created");
                console.log(formData);
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
