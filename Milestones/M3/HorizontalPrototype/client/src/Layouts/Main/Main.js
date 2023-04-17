import React from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";

function Main() {
  return (
    <div>
      <div>Main</div>
      <Button
        className="default-button"
        content="jiji"
        onClickEvent={() => window.alert("test")}
        isDisabled={false}
      />
    </div>
  );
}

export default Main;
