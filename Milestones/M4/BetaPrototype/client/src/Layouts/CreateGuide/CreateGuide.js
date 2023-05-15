import React, { useState} from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../utils/customAxios";
import Button from "../../Components/Button";

function CreateGuide() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    customAxios({
      method: "post",
      url: "/api/guides",
      data: {
        title: title,
        content: content
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };

  const navigate = useNavigate();
  const gotoPremiumGuide = () => {
    navigate("/premiumguides");
  };

  return (
    // <div>
    //   <h3>Premium Guides</h3>
    //   <form>
    //     <div>
    //       <label htmlFor="title">Title:</label>
    //       <input type="text" id="title" name="title" />
    //     </div>
    //     <div>
    //       <label htmlFor="description">Description:</label>
    //       <textarea id="description" name="description" rows="4" cols="50" />
    //     </div>
    //     <div>
    //       <label htmlFor="imageUpload">Upload an image:</label>
    //       <input
    //         type="file"
    //         id="imageUpload"
    //         name="imageUpload"
    //         accept="image/*"
    //       />
    //     </div>
    //     <div>
    //       <Button
    //         className="default-button"
    //         content="Submit"
    //         onClickEvent={gotoPremiumGuide}
    //       />
    //     </div>
    //   </form>
    // </div>
    <div className="create-guide-container">
      <div className="create-guide-info">
        <h1>Write your new Guide</h1>
        <form onSubmit={handleSubmit} className="new-post-form">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="new-guide-body"
            type="text"
            name="content"
            id="content"
            placeholder="Body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <label htmlFor="imageUpload">Upload an image:</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
          />
          <div className="form-buttons">
            <Button className="default-button" content="Submit" />
            <Button content="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGuide;
