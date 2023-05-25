import React from "react";
import "./style.css";

function Input({
  name,
  value,
  changeValue,
  isValidValue,
  warning,
  placeholder
}) {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={name}>
        {name}
      </label>
      <input
        className="input-box"
        autoComplete="off"
        type={
          name === "password" || name === "password-confirm"
            ? "password"
            : "text"
        }
        id={name}
        value={value}
        onChange={changeValue}
        placeholder={placeholder}
      />
      <p className="warning">{!isValidValue && value !== "" && warning}</p>
    </div>
  );
}

export default React.memo(Input);
