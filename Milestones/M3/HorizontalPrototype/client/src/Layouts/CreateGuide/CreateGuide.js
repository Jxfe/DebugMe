import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";

function CreateGuide() {
  const navigate = useNavigate();
  const gotoPremiumGuide = () => {
    navigate("/premiumguides");
  };
  return (
    <div>
      <h3>Premium Guides</h3>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4" cols="50" />
        </div>
        <div>
          <label htmlFor="imageUpload">Upload an image:</label>
          <input type="file" id="imageUpload" name="imageUpload" accept="image/*" />
        </div>
        <div>
          <Button 
            className="default-button"
            content="Submit"
            onClickEvent={gotoPremiumGuide}
            />
        </div>
      </form>
    </div>
  );
}

export default CreateGuide;
