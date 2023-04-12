import React from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";

function Main() {
  return (
    <div>
      <div>Main</div>
      <Button
        className="disabled-button"
        content="test"
        onClickEvent={() => window.alert("test")}
      />
    </div>
  );
}

export default Main;
