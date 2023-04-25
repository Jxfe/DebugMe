import "./style.css";

/**
 * className: default-textarea
 * rows: number
 * width: css width ex) 120px | 100% | 100vw ...
 */

function Textare({
  className,
  onChangeEvent,
  value,
  rows = 5,
  width = "calc(100% - 20px)",
}) {
  return (
    <textarea
      className={`input ${className}`}
      style={{ width: width }}
      value={value}
      onChange={onChangeEvent}
      rows={rows}
    />
  );
}

export default Textare;
