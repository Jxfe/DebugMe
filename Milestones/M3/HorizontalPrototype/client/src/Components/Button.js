import React from "react"; // Needed for AWS since it's using node 16
import "./style.css";

/**
 * className: default-button | disabled-button
 * width: css width ex) 120px | 100% | 100vw ...
 */

function Button({
  className,
  onClickEvent,
  content,
  isDisabled = false,
  width = "120px",
}) {
  return (
    <button
      className={`button ${className}`}
      style={{ width: width }}
      onClick={onClickEvent}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
}

export default Button;
