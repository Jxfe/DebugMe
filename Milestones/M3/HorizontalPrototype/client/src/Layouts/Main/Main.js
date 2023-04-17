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
