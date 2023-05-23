import React from "react";
import Button from "./Button";
import "./style.css";

function Modal({ title, content, buttonContent, buttonAction, closeModal }) {
  return (
    <div className="common-modal">
      <div className="common-modal-content">
        <div>
          {title}
          <span className="common-modal-close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div>{content}</div>
        <div className="common-modal-button">
          <Button
            className="default-button"
            content={buttonContent}
            onClickEvent={buttonAction}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
