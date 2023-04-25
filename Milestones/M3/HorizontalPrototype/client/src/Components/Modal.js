import React from "react";
import Button from "./Button";
import "./style.css";

function Modal({
  title,
  content,
  buttonContent,
  buttonAction,
  showModal,
  closeModal,
}) {
  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div>
              {title}
              <span className="close" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div>{content}</div>
            <div className="modal-button">
              <Button
                className="default-button"
                content={buttonContent}
                onClickEvent={buttonAction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
