import React, { useState } from "react";
import Button from "./Button";
import "./style.css";
import { customAxios } from "../utils/customAxios";

export default function CreatePost({ onClose, setCreateShowing }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    customAxios({
      method: "post",
      url: "/api/posts",
      data: {
        title: title,
        content: content
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    setCreateShowing(false);
  };

  return (
    <div className="post-popup-container">
      <div className="create-post-info">
        <h1>Write your new post</h1>
        <form onSubmit={handleSubmit} className="new-post-form">
          <input
            className="new-post-title"
            type="text"
            name="title"
            id="title"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="new-post-body"
            type="text"
            name="content"
            id="content"
            placeholder="Post Body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="form-buttons">
            <Button className="default-button" content="Submit" />
            <Button onClickEvent={onClose} content="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}
