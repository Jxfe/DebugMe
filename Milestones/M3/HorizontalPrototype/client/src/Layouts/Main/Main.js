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
