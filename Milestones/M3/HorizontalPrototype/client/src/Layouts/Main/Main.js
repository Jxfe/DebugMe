import React from "react"; // Needed for AWS since it's using node 16
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Textare from "../../Components/Textarea";

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
      <Input className="default-input" />
      <Textare className="default-textarea" rows={5} />
    </div>
  );
}

export default Main;
