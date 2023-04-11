import "./style.css";

function Button({ className, onClickEvent, content, isDisabled = false }) {
  return (
    <button
      className={`button ${className}`}
      onClick={onClickEvent}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
}

export default Button;
