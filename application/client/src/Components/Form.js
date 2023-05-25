import React, { useState } from "react";
import Button from "./Button";

function Form() {
  const [page, setPage] = useState(0);
  const FormPageTitles = ["Event Description", "Upload Image"];

  const DisplayPage = () => {
    if (page === 0) {
      return <EventInfo_1 />;
    } else {
      return <EventInfo_2 />;
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
            isDisabled={page === FormPageTitles.length - 1}
            onClickEvent={() => {
              setPage((currentPage) => currentPage + 1);
            }}
            content="Next"
          />
        </div>
      </div>
    </div>
  );
}

export default Form;
